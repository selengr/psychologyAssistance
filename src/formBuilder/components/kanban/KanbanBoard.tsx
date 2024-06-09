import { useMemo, startTransition } from 'react';
import QuestionGroup from './QuestionGroup';
import { DragEndEvent, DragOverEvent, DragStartEvent, useDndMonitor } from '@dnd-kit/core';
import { verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import useDesigner from '../hooks/useDesigner';
import { FormElements } from '../FormElements';
import { idGenerator } from '../../lib/idGenerator';
import { Box, Button, Typography } from '@mui/material';
import Iconify from '@/components/iconify/Iconify';

function KanbanBoard() {
  const {
    questionGroups,
    setQuestionGroups,
    elements,
    setElements,
    setOpenDialog,
    setSelectedElement,
    createNewQuestionGroup,
  } = useDesigner();
  const groupsId = useMemo(() => questionGroups.map((group: any) => group.id), [questionGroups]);

  useDndMonitor({
    onDragStart: (event: DragStartEvent) => {
      const { active } = event;

      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;

      if (isDesignerBtnElement) {
        const newElement = FormElements[active?.data?.current?.type].construct(
          idGenerator(),
          null,
          true
        );
        setElements((prev) => [...prev, newElement]);
      }

      return;
    },
    onDragOver: (event: DragOverEvent) => {
      const { active, over } = event;

      setElements((questions) => {
        const isTempElementExist = questions.some((t) => t?.temp);
        if (isTempElementExist && !over) {
          const tempEl = questions.find((p) => p?.temp);
          if (tempEl) {
            tempEl.groupId = null;
            return [tempEl, ...questions.filter((t) => !t?.temp)];
          } else {
            return questions;
          }
        }
        return questions;
      });

      if (!over) return;

      const activeId = active.id;
      const overId = over.id;

      if (activeId === overId) return;

      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;
      const isOverMyQuestion = over.data?.current?.type === 'question';
      const isOverGroup = over.data?.current?.type === 'question-group';

      if (isDesignerBtnElement && isOverMyQuestion) {
        startTransition(() => {
          setElements((questions) => {
            const activeIndex = questions.findIndex((t) => t?.temp);
            const overIndex = questions.findIndex((t) => t.id === overId);

            // if (questions[activeIndex].groupId != questions[overIndex].groupId) {
            questions[activeIndex].groupId = questions[overIndex].groupId;
            return arrayMove(questions, activeIndex, overIndex);
          });
        });

        return;
      } else if (isDesignerBtnElement && isOverGroup) {
        if (!elements.some((el) => el.groupId === over.data.current.group.id)) {
          startTransition(() => {
            setElements((questions) => {
              const activeIndex = questions.findIndex((t) => t?.temp);

              questions[activeIndex].groupId = over?.data?.current?.group?.id;
              return arrayMove(questions, activeIndex, 0);
            });
          });
        }
        // else if (isOverGroup) {
        //   console.log("sdsd");
        //   setElements((questions) => {
        //     const tempEl = questions.find((p) => p?.temp);
        //     console.log(tempEl);
        //     if (tempEl) {
        //       tempEl.groupId = null;
        //       return [tempEl, ...questions.filter((t) => !t?.temp)];
        //     }

        //     return questions;
        //   });
        // }
        return;
      }

      const isActiveQuestion = active.data.current?.type === 'question';
      const isOverQuestion = over.data.current?.type === 'question';

      if (!isActiveQuestion) return;

      // Im dropping a Question over another Question
      if (isActiveQuestion && isOverQuestion) {
        startTransition(() => {
          setElements((questions) => {
            const activeIndex = questions.findIndex((t) => t.id === activeId);
            const overIndex = questions.findIndex((t) => t.id === overId);

            if (questions[activeIndex].groupId != questions[overIndex].groupId) {
              questions[activeIndex].groupId = questions[overIndex].groupId;
              return arrayMove(questions, activeIndex, overIndex - 1);
            }

            return arrayMove(questions, activeIndex, overIndex);
          });
        });
        return;
      }

      // Im dropping a Question over a Question Group
      if (isActiveQuestion && isOverGroup) {
        startTransition(() => {
          setElements((questions) => {
            const activeIndex = questions.findIndex((t) => t?.id === activeId);

            questions[activeIndex].groupId = overId;
            return arrayMove(questions, activeIndex, activeIndex);
          });
        });
      }
    },
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      // if (!over) return;
      if (elements.length && over && active?.data?.current?.type !== 'question-group') {
        const droppedTempElIndex = elements?.findIndex((t: any) => t?.temp);
        const droppedEl = elements?.find((t: any) => t?.temp);

        if (droppedEl?.groupId !== over?.data?.current?.group?.id) {
          const elTemp = elements[droppedTempElIndex];

          if (elTemp?.temp) {
            elements[droppedTempElIndex].groupId = over?.data?.current?.group?.id;
            setOpenDialog(true);
            setSelectedElement({ fieldElement: elements[droppedTempElIndex], position: null });
          }
        } else if (droppedTempElIndex !== -1) {
          setOpenDialog(true);
          setSelectedElement({
            fieldElement: elements[droppedTempElIndex],
            position: droppedTempElIndex,
          });
        }

        setElements((prev) => {
          return prev.filter((p) => !p?.temp);
        });

        return;
      }

      setElements((prev) => {
        return prev.filter((p) => !p?.temp);
      });

      const activeId = active?.id;
      const overId = over?.id;

      if (activeId === overId) return;

      const isActiveAGroup = active?.data?.current?.type === 'question-group';
      if (!isActiveAGroup) return;

      setQuestionGroups((groups: any) => {
        const activeGroupIndex = groups.findIndex((group: any) => group.id === activeId);
        const overGroupIndex = groups.findIndex((group: any) => group.id === overId);

        return arrayMove(groups, activeGroupIndex, overGroupIndex);
      });
    },
  });

  const lastQuestionGroup = questionGroups[questionGroups.length - 1];
  const isLastQuestionGroupNotEmpty = elements.some(
    (questions) => questions?.groupId === lastQuestionGroup?.id
  );

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
        }}
        gap={2}
      >
        <SortableContext items={groupsId} strategy={verticalListSortingStrategy}>
          {questionGroups?.map((que: any) => (
            <QuestionGroup
              key={que?.id}
              group={que}
              questions={elements?.filter((question) => question?.questionGroupId === que?.id)}
            />
          ))}
        </SortableContext>
      </Box>
      {isLastQuestionGroupNotEmpty && (
        <Button
          onClick={() => {
            createNewQuestionGroup();
          }}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Iconify icon="ic:round-plus" />
          <Typography variant="body2" component={'span'}>
            صفحه جدید
          </Typography>
        </Button>
      )}
    </>
  );
}

export default KanbanBoard;
