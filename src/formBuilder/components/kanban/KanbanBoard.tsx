import { useMemo, startTransition } from 'react';
import QuestionGroup from './QuestionGroup';
import { DragEndEvent, DragOverEvent, DragStartEvent, useDndMonitor } from '@dnd-kit/core';
import { verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import useDesigner from '../hooks/useDesigner';
import { ElementsType, FormElements } from '../FormElements';
import { idGenerator } from '../../lib/idGenerator';
import { Box, Button, Typography } from '@mui/material';
import Iconify from '@/components/iconify/Iconify';
import { usePathname } from 'next/navigation';
import { IFormElementConstructor } from '@/@types/bulider';

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
  const groupsId = useMemo(() => questionGroups.map((group: any) => group), [questionGroups]);
  const path = usePathname();
  const formId = Number(path.split('/')[2]);

  useDndMonitor({
    onDragStart: (event: DragStartEvent) => {
      // * detect active qeuestion
      // * add a temp prop to it
      // * save the current question group and position
      const { active } = event;

      const isSidebarBtn = active.data?.current?.isSidebarBtnElement;
      const designerBtnType: ElementsType = active?.data?.current?.type;

      if (isSidebarBtn) {
        const newElement = FormElements[designerBtnType].construct({
          questionId: idGenerator(),
          questionGroupId: null,
          formId,
          title: '',
          position: null,
        } as IFormElementConstructor);
        newElement.temp = true;

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
            tempEl.questionGroupId = null;
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

      const isSidebarBtn = active.data?.current?.isSidebarBtnElement;
      const isOverMyQuestion = over.data?.current?.type === 'question';
      const isOverGroup = over.data?.current?.type === 'question-group';

      if (isSidebarBtn && isOverMyQuestion) {
        // startTransition(() => {
        setElements((questions) => {
          const activeIndex = questions.findIndex((t) => t?.temp);
          const overIndex = questions.findIndex((t) => t.questionId === overId);

          // if (questions[activeIndex].questionGroupId != questions[overIndex].questionGroupId)
          questions[activeIndex].questionGroupId = questions[overIndex].questionGroupId;
          return arrayMove(questions, activeIndex, overIndex);
        });
        // });

        return;
      } else if (isSidebarBtn && isOverGroup) {
        const overGroup = over?.data?.current?.group;
        if (!elements?.some((el) => el.questionGroupId === overGroup)) {
          // startTransition(() => {
          setElements((questions) => {
            const activeIndex = questions.findIndex((t) => t?.temp);
            const overGroup = over?.data?.current?.group;

            questions[activeIndex].questionGroupId = overGroup;
            return arrayMove(questions, activeIndex, 0);
          });
          // });
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
        setElements((questions) => {
          const activeIndex = questions.findIndex((t) => t.questionId === activeId);
          const overIndex = questions.findIndex((t) => t.questionId === overId);

          if (questions[activeIndex].questionGroupId != questions[overIndex].questionGroupId) {
            questions[activeIndex].questionGroupId = questions[overIndex].questionGroupId;
            return arrayMove(questions, activeIndex, overIndex - 1);
          }

          return arrayMove(questions, activeIndex, overIndex);
        });

        return;
      }

      // Im dropping a Question over a Question Group
      if (isActiveQuestion && isOverGroup) {
        startTransition(() => {
          setElements((questions) => {
            const activeIndex = questions.findIndex((t) => t?.questionId === activeId);

            questions[activeIndex].questionGroupId = Number(overId);
            return arrayMove(questions, activeIndex, activeIndex);
          });
        });
      }
    },
    onDragEnd: (event: DragEndEvent) => {
      // * get the active question based on specified property
      // * read the previous question group and current group
      // * call api with new data and get new position to send
      // * if the element's group is not changes and the postion
      // * in the current group again has not chnage do not call api
      const { active, over } = event;
      // if (!over) return;
      if (elements.length && over && active?.data?.current?.type !== 'question-group') {
        const droppedTempElIndex = elements?.findIndex((t: any) => t?.temp);
        const droppedEl = elements?.find((t: any) => t?.temp);

        if (droppedEl?.questionGroupId !== over?.data?.current?.group) {
          const elTemp = elements[droppedTempElIndex];

          if (elTemp?.temp) {
            elements[droppedTempElIndex].questionGroupId = over?.data?.current?.group;
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
        const activeGroupIndex = groups.findIndex((group: any) => group === activeId);
        const overGroupIndex = groups.findIndex((group: any) => group === overId);

        return arrayMove(groups, activeGroupIndex, overGroupIndex);
      });
    },
  });

  console.log('questionGroups', questionGroups);
  console.log('elements', elements);

  const lastQuestionGroup = questionGroups[questionGroups.length - 1];
  const isLastQuestionGroupNotEmpty = elements.some(
    (questions) => questions?.questionGroupId === lastQuestionGroup
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
              key={que}
              group={que}
              questions={elements?.filter((question) => question?.questionGroupId === Number(que))}
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
