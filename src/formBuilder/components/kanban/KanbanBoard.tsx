import { useMemo, startTransition, useState } from 'react';
import QuestionGroup from './QuestionGroup';
import { DragEndEvent, DragOverEvent, DragStartEvent, useDndMonitor } from '@dnd-kit/core';
import { verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import useDesigner from '../hooks/useDesigner';
import { ElementsType, FormElementInstance, FormElements } from '../FormElements';
import { idGenerator } from '../../lib/idGenerator';
import { IcRoundPlus } from '../icons/IcRoundPlus';
import { usePathname } from 'next/navigation';
import { IFormElementConstructor } from '@/@types/bulider';
import { callApiCreateNewQuestionGroup, IChangeOrMovePositionApi } from '@/services/apis/builder';
import { LoadingButton } from '@mui/lab';

function KanbanBoard() {
  const {
    questionGroups,
    setQuestionGroups,
    elements,
    setElements,
    setOpenDialog,
    setSelectedElement,
    createNewQuestionGroup,
    changeOrMovePositionApiReducer,
  } = useDesigner();
  const [oneGroupIsDragged, setOneGroupIsDragged] = useState(false);
  const [newPageIsLoading, setNewPageIsLoading] = useState<boolean>(false);
  const groupsId = useMemo(() => questionGroups?.map((group: any) => group), [questionGroups]);
  const itemsByGroup = useMemo(() => {
    return elements?.reduce((acc: any, question: any) => {
      if (!acc[question.questionGroupId]) {
        acc[question.questionGroupId] = [];
      }
      acc[question.questionGroupId].push(question);
      return acc;
    }, {});
  }, [elements]);
  const path = usePathname();
  const formId = Number(path.split('/')[2]);

  async function handleCreateNewPage() {
    try {
      setNewPageIsLoading(true);
      const res = await callApiCreateNewQuestionGroup({
        formId: formId,
      });
      createNewQuestionGroup(res?.data?.questionGroupId);
      setNewPageIsLoading(false);
    } catch (error) {
      console.error(error);
      setNewPageIsLoading(false);
    }
  }

  useDndMonitor({
    onDragStart: (event: DragStartEvent) => {
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
      } else if (active?.data?.current?.type === 'question') {
        setElements((questions: any) => {
          const activeQuestionId = active?.data?.current?.question?.questionId;
          const newOnes = questions.map((que: any) => {
            if (que.questionId === activeQuestionId) {
              return {
                ...que,
                draft: { prevGroup: que.questionGroupId, prevPosition: que.position },
              };
            } else {
              return que;
            }
          });
          return newOnes;
        });
      } else if (active?.data?.current?.type === 'question-group') {
        setOneGroupIsDragged(true);
      }

      return;
    },
    onDragOver: (event: DragOverEvent) => {
      const { active, over } = event;

      setElements((questions) => {
        const isTempElementExist = questions?.some((t) => t?.temp);
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
        startTransition(() => {
          setElements((questions) => {
            const activeIndex = questions.findIndex((t) => t?.temp);
            const overIndex = questions.findIndex((t) => t.questionId === overId);

            if (questions[activeIndex].questionGroupId != questions[overIndex].questionGroupId) {
              questions[activeIndex].questionGroupId = questions[overIndex].questionGroupId;
              return arrayMove(questions, activeIndex, overIndex);
            } else {
              return arrayMove(questions, activeIndex, overIndex);
            }
          });
        });

        return;
      } else if (isSidebarBtn && isOverGroup) {
        const overGroup = over?.data?.current?.group;
        if (!elements?.some((el) => el.questionGroupId === overGroup)) {
          startTransition(() => {
            setElements((questions) => {
              const activeIndex = questions.findIndex((t) => t?.temp);
              const overGroup = over?.data?.current?.group;

              questions[activeIndex].questionGroupId = overGroup;
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
            const activeIndex = questions.findIndex((t) => t.questionId === activeId);
            const overIndex = questions.findIndex((t) => t.questionId === overId);

            if (questions[activeIndex].questionGroupId != questions[overIndex].questionGroupId) {
              questions[activeIndex].questionGroupId = questions[overIndex].questionGroupId;
              return arrayMove(questions, activeIndex, overIndex - 1);
            } else {
              return arrayMove(questions, activeIndex, overIndex);
            }
          });
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
      const { active, over } = event;
      // if (!over) return;

      if (
        elements?.length &&
        over &&
        active?.data?.current?.type !== 'question-group' &&
        active?.data?.current?.isSidebarBtnElement
      ) {
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
          const group = elements.filter(
            (el) => el.questionGroupId === elements[droppedTempElIndex].questionGroupId
          );
          const index = group.findIndex(
            (gro) => gro.questionId === elements[droppedTempElIndex].questionId
          );

          setOpenDialog(true);
          setSelectedElement({
            fieldElement: elements[droppedTempElIndex],
            position: {
              apiPosition: index,
              realPosition: droppedTempElIndex,
            },
          });
        }

        setElements((prev) => {
          return prev.filter((p) => !p?.temp);
        });
      }

      setElements((prev) => {
        return prev.filter((p) => !p?.temp);
      });

      const activeEl = active?.data?.current;

      if (activeEl?.type === 'question') {
        const currentQuestion = activeEl?.question;
        if (currentQuestion?.questionGroupId !== currentQuestion?.draft?.prevGroup) {
          const data: IChangeOrMovePositionApi = {
            formBuilderId: formId,
            questionId: currentQuestion?.questionId,
            questionGroupId: currentQuestion?.draft?.prevGroup,
            targetQuestionGroupId: currentQuestion?.questionGroupId,
            newPosition: currentQuestion?.position,
          };
          changeOrMovePositionApiReducer(data, activeEl?.question as FormElementInstance);
        } else if (currentQuestion?.position !== currentQuestion?.draft?.prevPosition) {
          const data: IChangeOrMovePositionApi = {
            formBuilderId: formId,
            questionId: currentQuestion?.questionId,
            questionGroupId: currentQuestion?.questionGroupId,
            targetQuestionGroupId: null,
            newPosition: currentQuestion?.position,
          };
          changeOrMovePositionApiReducer(data, activeEl?.question as FormElementInstance);
        } else {
          console.log('no change in group or position');
          return;
        }
      } else if (activeEl?.type === 'question-group') {
        console.log("It's a Group!!");
      }

      const activeId = active?.id;
      const overId = over?.id;

      setOneGroupIsDragged(false);

      if (activeId === overId) return;

      const isActiveAGroup = active?.data?.current?.type === 'question-group';
      if (!isActiveAGroup) return;

      setQuestionGroups((groups: any) => {
        const activeGroupIndex = groups.findIndex((group: any) => group === activeId);
        const overGroupIndex = groups.findIndex((group: any) => group === overId);

        return arrayMove(groups, activeGroupIndex, overGroupIndex);
      });
      setOneGroupIsDragged(false);
    },
    onDragCancel() {
      setOneGroupIsDragged(false);
      setElements((prev) => {
        return prev.filter((p) => !p?.temp);
      });
    },
  });

  const lastQuestionGroup = questionGroups[questionGroups?.length - 1];
  const isLastQuestionGroupNotEmpty = elements?.some(
    (questions) => questions?.questionGroupId === lastQuestionGroup
  );

  return (
    <>
      <div className="flex flex-col h-full w-full gap-4 box-border">
        <SortableContext items={groupsId} strategy={verticalListSortingStrategy}>
          {questionGroups?.map((group: any) => (
            <QuestionGroup
              key={group}
              minimized={oneGroupIsDragged}
              group={group}
              questions={itemsByGroup[group]}
            />
          ))}
        </SortableContext>
      </div>
      {isLastQuestionGroupNotEmpty && (
        <LoadingButton
          variant="outlined"
          onClick={handleCreateNewPage}
          loading={newPageIsLoading}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 1,
          }}
        >
          <IcRoundPlus />
          <p className="font-medium">صفحه جدید</p>
        </LoadingButton>
      )}
    </>
  );
}

export default KanbanBoard;
