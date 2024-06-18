import { useMemo, memo } from 'react';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import QuestionCard from './QuestionCard';
import useDesigner from '../hooks/useDesigner';
import { Box, IconButton, Typography } from '@mui/material';
import Iconify from '@/components/iconify/Iconify';
import { FormElementInstance } from '../FormElements';

const QuestionGroup = memo(function QuestionGroup({
  group,
  questions,
}: {
  group: number;
  questions: FormElementInstance[];
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

  if (isDragging) {
    return (
      <Box
        display="flex"
        width="100%"
        height="75px"
        borderRadius="5px"
        border="1px solid #d8d8d8"
        ref={setNodeRef}
        style={style}
      ></Box>
    );
  }

  return (
    <Box
      display="flex"
      width="100%"
      borderRadius="5px"
      border="1px solid #D8D8D8"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {questions.length >= 1 && (
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          minHeight="60px"
          paddingX={2}
          paddingTop={2}
          flexGrow="1"
          gap={2}
        >
          <SortableContext items={questionsIds} strategy={verticalListSortingStrategy}>
            {questions?.map((question: any) => (
              <QuestionCard key={question?.questionId} question={question} />
            ))}
          </SortableContext>
        </Box>
      )}

      <Box display="flex" flexDirection="row-reverse" alignItems="center" justifyContent="center">
        <Typography padding={1} marginX="auto" variant="body2" component={'p'}>
          نوع سوال را از فهرست کناری به اینجا بکشید
        </Typography>
        <IconButton
          onClick={() => {
            if (questionGroups.length === 1) return;
            deleteQuestionGroup(group);
          }}
        >
          {questions.length >= 1 && <Iconify icon="ph:dots-three-vertical-bold" />}
        </IconButton>
      </Box>
    </Box>
  );
});

export default QuestionGroup;
