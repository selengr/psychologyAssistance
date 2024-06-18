import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import React, { useState } from 'react';
import { SidebarBtnElementDragOverlay } from './SidebarBtnElement';
import { ElementsType, FormElements } from './FormElements';
import useDesigner from './hooks/useDesigner';
import { Box } from '@mui/material';

function DragOverlayWrapper() {
  const { elements } = useDesigner();
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) return null;

  let node = <Box>No drag overlay</Box>;
  const isSidebarBtn = draggedItem.data?.current?.isSidebarBtnElement;

  const isQuestionElement = draggedItem.data?.current?.isQuestionElement;

  if (isSidebarBtn) {
    const type = draggedItem.data?.current?.type as ElementsType;
    node = <SidebarBtnElementDragOverlay formElement={FormElements[type]} />;
  } else if (isQuestionElement) {
    const elementId = draggedItem.data?.current?.question?.questionId;
    const element = elements.find((el) => el.questionId === elementId);

    if (!element) node = <Box>فیلد یافت نشد!</Box>;
    else {
      const DesignerElementComponent = FormElements[element.questionType].designerComponent;

      node = (
        <Box
          sx={{
            direction: 'ltr',
            display: 'flex',
            justifyContent: 'center',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: (theme) => theme.palette.primary.main,
            borderRadius: '5px',
            backgroundColor: '#fff',
            height: '65px',
            width: '100%',
            pointerEvents: 'none',
            opacity: '0.9',
            paddingX: 2,
            paddingY: 1,
          }}
        >
          <DesignerElementComponent elementInstance={element} />
        </Box>
      );
    }
  } else if (draggedItem.data?.current?.type === 'question-group') {
    node = (
      <Box
        sx={{
          display: 'flex',
          borderRadius: '5px',
          height: '75px',
          width: '100%',
          opacity: '0.5',
          border: '1px solid #d8d8d8',
        }}
      ></Box>
    );
  }

  return <DragOverlay>{node}</DragOverlay>;
}

export default DragOverlayWrapper;
