import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FormElements } from '../FormElements';
import useDesigner from '../hooks/useDesigner';
import { Box } from '@mui/material';
import Iconify from '@/components/iconify/Iconify';

function QuestionCard({ question }) {
  const { setSelectedElement, setOpenDialog, removeElement } = useDesigner();

  // add index to each question for later use
  // things like sending the current or new position
  // to the backend
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: question.id,
    data: {
      type: 'question',
      question,
    },
  });

  const DesignerElement = FormElements[question.type].designerComponent;

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
          backgroundColor: 'white',
          height: '65px',
          border: '1px solid #d8d8d8',
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
          backgroundColor: 'white',
          height: '65px',
          border: '1px solid #d8d8d8',
          borderRadius: '5px',
          padding: '8px',
        }}
      />
    );
  }

  return (
    <Box
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement({ fieldElement: question, position: null });
        setOpenDialog(true);
      }}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      dir="rtl"
      sx={{
        backgroundColor: 'white',
        height: '65px',
        width: '100%',
        position: 'relative',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 2,
        border: '1px solid #d8d8d8',
      }}
    >
      <DesignerElement elementInstance={question} />
      <Box
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
          removeElement(question.id);
        }}
      >
        <Iconify icon="ph:dots-three-vertical-bold" />
      </Box>
    </Box>
  );
}

export default QuestionCard;
