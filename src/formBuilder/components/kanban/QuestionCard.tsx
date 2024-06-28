import { memo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FormElementInstance, FormElements } from '../FormElements';
import useDesigner from '../hooks/useDesigner';
import { Box, IconButton } from '@mui/material';
import Iconify from '@/components/iconify/Iconify';

const QuestionCard = memo(function QuestionCard({ question }: { question: FormElementInstance }) {
  const { setSelectedElement, setOpenDialog, removeElement } = useDesigner();

  let { setNodeRef, attributes, listeners, transform, transition, isDragging, index } = useSortable(
    {
      id: question.questionId,
      data: {
        type: 'question',
        question,
        isQuestionElement: true,
      },
    }
  );

  // ? update every single question's position
  // ? after one question is moved
  question.position = index;

  const DesignerElement = FormElements[question.questionType].designerComponent;

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
          display: 'flex',
          alignItems: 'center',
          opacity: '0.3',
          backgroundColor: (theme) => theme.palette.secondary.lighter,
          height: '65px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: (theme) => theme.palette.secondary.darker,
          borderRadius: '5px',
          padding: '8px',
        }}
      />
    );
  }

  if (question?.temp) {
    return (
      <Box
        style={style}
        sx={{
          display: 'flex',
          alignItems: 'center',
          opacity: '0.3',
          backgroundColor: (theme) => theme.palette.secondary.lighter,
          height: '65px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: (theme) => theme.palette.secondary.darker,
          borderRadius: '5px',
          padding: '8px',
        }}
      />
    );
  }

  return (
    <Box
      onClick={(e: any) => {
        e.stopPropagation();
        setSelectedElement({ fieldElement: question, position: index });
        setOpenDialog(true);
      }}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      dir="rtl"
      bgcolor="white"
      height="65px"
      width="100%"
      position="relative"
      borderRadius="5px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="row"
      padding={2}
      border="1px solid #d8d8d8"
    >
      <DesignerElement elementInstance={question} />
      <IconButton
        sx={{
          height: '100%',
          width: '35px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '10px',
        }}
        onClick={(e) => {
          e.stopPropagation();
          removeElement(question?.questionId);
        }}
      >
        <Iconify icon="ph:dots-three-vertical-bold" />
      </IconButton>
    </Box>
  );
});

export default QuestionCard;
