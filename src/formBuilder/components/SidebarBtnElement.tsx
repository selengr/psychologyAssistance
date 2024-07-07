'use client';

import { useDraggable } from '@dnd-kit/core';
import { FormElement, FormElements } from './FormElements';
import { Button } from '@mui/material';
import useDesigner from './hooks/useDesigner';
import { idGenerator } from '../lib/idGenerator';
import { IFormElementConstructor } from '@/@types/bulider';
import { usePathname } from 'next/navigation';
import { indigo } from '@mui/material/colors';

function SidebarBtnElement({ formElement }: { formElement: FormElement }) {
  const { setOpenDialog, setSelectedElement, questionGroups } = useDesigner();
  const path = usePathname();
  const formId = Number(path.split('/')[2]);
  const { label } = formElement.designerBtnElement;

  const draggable = useDraggable({
    id: `designer-btn-${formElement.questionType}`,
    data: {
      type: formElement.questionType,
      isSidebarBtnElement: true,
    },
  });

  return (
    <Button
      onClick={() => {
        if (questionGroups.length) {
          const newElement = FormElements[formElement.questionType].construct({
            questionId: idGenerator(),
            questionGroupId: questionGroups[questionGroups.length - 1],
            formId,
            title: '',
            position: null,
          } as IFormElementConstructor);
          setOpenDialog(true);
          setSelectedElement({ fieldElement: newElement, position: null });
        }
      }}
      ref={draggable.setNodeRef}
      variant={'outlined'}
      sx={{
        borderColor: (theme) => theme.palette.primary.main,
        width: '100%',
        borderRadius: 1,
      }}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <p className="py-2 font-normal">{label}</p>
    </Button>
  );
}

export function SidebarBtnElementDragOverlay({ formElement }: { formElement: FormElement }) {
  const { label } = formElement.designerBtnElement;

  return (
    <Button
      variant="contained"
      sx={{
        borderWidth: '1px',
        borderColor: indigo[100],
        borderStyle: 'solid',
        width: '100%',
        borderRadius: 1,
        backgroundColor: 'white',
        '&.MuiButtonBase-root:hover': {
          backgroundColor: 'white',
          color: 'primary.main',
          boxShadow: (theme) => theme.customShadows.primary,
        },
      }}
    >
      <p className="py-2 font-normal">{label}</p>
    </Button>
  );
}

export default SidebarBtnElement;
