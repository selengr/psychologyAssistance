import { memo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ElementsType, FormElementInstance, FormElements } from '../FormElements';
import useDesigner from '../hooks/useDesigner';
import { Box } from '@mui/material';
import { PhDotsThreeVerticalBold } from '../icons/PhDotsThreeVerticalBold';
import QuestionMenu from '../PopUpMenu';

const QuestionCard = memo(function QuestionCard({
  question,
  questionMinimized,
}: {
  question: FormElementInstance;
  questionMinimized: boolean;
}) {
  const { setSelectedElement, setOpenDialog, elements } = useDesigner();

  let { setNodeRef, attributes, listeners, transform, transition, isDragging, index } = useSortable(
    {
      id: question.questionId,
      data: {
        type: 'question',
        question,
        isQuestionElement: true,
      },
      animateLayoutChanges: () => false,
    }
  );

  // ? update every single question's position
  // ? after one question is moved
  question.position = index;

  const DesignerElement = FormElements[question.questionType as ElementsType].designerComponent;

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        className="flex items-center opacity-30 h-[58px] border border-1 border-[#091A7A] rounded-sm bg-[#D6E4FF]"
        ref={setNodeRef}
        style={style}
      />
    );
  }

  if (question?.temp) {
    return (
      <Box
        className="flex items-center opacity-30 h-[58px] border border-1 border-[#091A7A] rounded-sm bg-[#D6E4FF]"
        style={style}
      />
    );
  }

  return (
    <div
      onClick={(e: any) => {
        e.stopPropagation();
        const realPositionInElements = elements.findIndex(
          (el) => el.questionId === question.questionId
        );
        setSelectedElement({
          fieldElement: question,
          position: {
            apiPosition: index,
            realPosition: realPositionInElements,
          },
        });
        setOpenDialog(true);
      }}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      dir="rtl"
      className="flex items-center h-[65px w-full] relative rounded-sm justify-center flex-row p-2 border border-1 border-[#d8d8d8]"
    >
      <DesignerElement elementInstance={question} />
      {!questionMinimized && (
        <button
          className="h-full w-[35px] flex justify-center items-center rounded-md"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <QuestionMenu
            questionID={question?.questionId}
            position={elements.findIndex((el) => el.questionId === question.questionId)}
          >
            <PhDotsThreeVerticalBold />
          </QuestionMenu>
        </button>
      )}
    </div>
  );
});

export default QuestionCard;
