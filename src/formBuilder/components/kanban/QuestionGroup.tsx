import { useMemo } from 'react';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import QuestionCard from './QuestionCard';
import useDesigner from '../hooks/useDesigner';
import { Box, IconButton, Typography } from '@mui/material';
import Iconify from '@/components/iconify/Iconify';

function QuestionGroup({ group, questions }) {
  const { questionGroups, deleteQuestionGroup } = useDesigner();
  const questionsIds = useMemo(() => {
    return questions?.map((question: any) => question?.questionId);
  }, [questions]);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: group.id,
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
        ref={setNodeRef}
        style={style}
        sx={{
          width: '100%',
          height: '75px',
          borderRadius: '5px',
          border: '1px solid #d8d8d8',
          display: 'flex',
        }}
      ></Box>
    );
  }

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{
        width: '100%',
        borderRadius: '5px',
        border: '1px solid #D8D8D8',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {questions.length >= 1 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            minHeight: '60px',
            paddingX: 2,
            paddingTop: 2,
            flexGrow: '1',
          }}
          gap={2}
        >
          <SortableContext items={questionsIds} strategy={verticalListSortingStrategy}>
            {questions?.map((question: any) => (
              <QuestionCard key={question?.questionId} question={question} />
            ))}
          </SortableContext>
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography sx={{ marginX: 'auto', padding: '1rem' }} variant="body2" component={'p'}>
          نوع سوال را از فهرست کناری به اینجا بکشید
        </Typography>
        <IconButton
          onClick={() => {
            if (questionGroups.length === 1) return;
            deleteQuestionGroup(group.id);
          }}
        >
          {questions.length >= 1 && <Iconify icon="ph:dots-three-vertical-bold" />}
        </IconButton>
      </Box>
    </Box>
  );
}

export default QuestionGroup;
