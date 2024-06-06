import React, { useState } from 'react';
import { FormElement, FormElements } from './FormElements';
import { useDraggable } from '@dnd-kit/core';
import { Button, Typography } from '@mui/material';
import ConfirmDialog from '@/components/confirm-dialog/ConfirmDialog';
import useDesigner from './hooks/useDesigner';
import PropertiesFormSidebar from './PropertiesFormSidebar';
import { idGenerator } from '../lib/idGenerator';

function SidebarBtnElement({ formElement }: { formElement: FormElement }) {
  const { label } = formElement.designerBtnElement;
  const { openDialog, setOpenDialog, setSelectedElement } = useDesigner();
  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  });

  return (
    <>
      <Button
        ref={draggable.setNodeRef}
        onClick={() => {
          const newElement = FormElements[formElement.type].construct(
            idGenerator()
          );
          setOpenDialog(true)
          setSelectedElement(newElement);
        }}
        variant={'outlined'}
        sx={{
          borderColor: (theme) => theme.palette.primary.main,
          width: '100%',
        }}
        {...draggable.listeners}
        {...draggable.attributes}
      >
        <Typography variant="body2" component={'p'} py={0.5}>
          {label}
        </Typography>
      </Button>

      <ConfirmDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        title="عملیات حذف"
        content={<PropertiesFormSidebar />}
        cancelText="نه، منصرف شدم"
        cancelStatus={false}
        action={<> 
        <button>tytt</button>
        </>}
      />
    </>
  );
}

export function SidebarBtnElementDragOverlay({ formElement }: { formElement: FormElement }) {
  const { label } = formElement.designerBtnElement;

  return (
    <Button
      variant={'outlined'}
      sx={{
        borderColor: (theme) => theme.palette.primary.main,
        width: '100%',
      }}
    >
      <Typography variant="body2" component={'p'} py={0.5}>
        {label}
      </Typography>
    </Button>
  );
}

export default SidebarBtnElement;
