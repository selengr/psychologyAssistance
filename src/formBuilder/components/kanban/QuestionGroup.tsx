import { useMemo, memo } from 'react';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import QuestionCard from './QuestionCard';
import useDesigner from '../hooks/useDesigner';
import { FormElementInstance } from '../FormElements';
import { PhDotsThreeVerticalBold } from '../icons/PhDotsThreeVerticalBold';

const QuestionGroup = memo(function QuestionGroup({
  group,
  questions,
  minimized,
  questionMinimized,
}: {
  group: number;
  questions: FormElementInstance[];
  minimized: boolean;
  questionMinimized: boolean;
}) {
  const { questionGroups, deleteQuestionGroup } = useDesigner();
  const questionsIds = useMemo(() => {
    return questions?.map((question: any) => question?.questionId);
  }, [questions]);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: group,
    data: {
      type: 'question-group',
      group,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging || minimized) {
    return (
      <div
        className="flex w-full h-[75px] rounded-sm border border-1 border-[#d8d8d8] bg-[#433792]"
        ref={setNodeRef}
        style={style}
      ></div>
    );
  }

  return (
    <div
      className="flex flex-col w-full rounded-sm items-center justify-center border border-1 border-[#d8d8d8]"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {questions?.length >= 1 && (
        <div className="flex flex-col w-full min-h-[60px] px-2 pt-2 flex-grow gap-4">
          <SortableContext items={questionsIds} strategy={verticalListSortingStrategy}>
            {questions?.map((question: FormElementInstance, index: number) => (
              <QuestionCard
                key={questionsIds[index]}
                // @ts-ignore
                question={question}
                questionMinimized={questionMinimized}
              />
            ))}
          </SortableContext>
        </div>
      )}

      <div className="flex flex-row-reverse items-center justify-center py-2">
        <p className="p-2 mx-auto text-center">نوع سوال را از فهرست کناری به اینجا بکشید</p>
        <button
          onClick={() => {
            if (questionGroups?.length === 1) return;
            deleteQuestionGroup(group);
          }}
        >
          {questions?.length >= 1 && <PhDotsThreeVerticalBold />}
        </button>
      </div>
    </div>
  );
});

export default QuestionGroup;
