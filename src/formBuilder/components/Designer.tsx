'use client';

import DesignerSidebar from './DesignerSidebar';
import useDesigner from './hooks/useDesigner';
import { ElementsType, FormElementInstance, FormElements } from './FormElements';
import { idGenerator } from '@/formBuilder/lib/idGenerator';
import { Box, IconButton, Typography } from '@mui/material';
import Iconify from '@/components/iconify/Iconify';
import KanbanBoard from './kanban/KanbanBoard';
import CreateFieldDialog from './createFieldDialog';

function Designer() {
  const { setSelectedElement, setOpenDialog, openDialog, startPage, finishPage } = useDesigner();

  // const droppable = useDroppable({
  //   id: 'designer-drop-area',
  //   data: {
  //     isDesignerDropArea: true,
  //   },
  // });

  // useDndMonitor({
  //   onDragEnd: (event: DragEndEvent) => {
  //     const { active, over } = event;
  //     if (!active || !over) return;

  //     const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;
  //     const isDroppingOverDesignerDropArea = over.data?.current?.isDesignerDropArea;

  //     const droppingSidebarBtnOverDesignerDropArea =
  //       isDesignerBtnElement && isDroppingOverDesignerDropArea;

  //     // First scenario
  //     if (droppingSidebarBtnOverDesignerDropArea) {
  //       const type = active.data?.current?.type;
  //       const newElement = FormElements[type as ElementsType].construct(idGenerator());

  //       addElement(elements.length, newElement);
  //       setSelectedElement(newElement);
  //       setOpenDialog(true);
  //       return;
  //     }

  //     const isDroppingOverDesignerElementTopHalf = over.data?.current?.isTopHalfDesignerElement;

  //     const isDroppingOverDesignerElementBottomHalf =
  //       over.data?.current?.isBottomHalfDesignerElement;

  //     const isDroppingOverDesignerElement =
  //       isDroppingOverDesignerElementTopHalf || isDroppingOverDesignerElementBottomHalf;

  //     const droppingSidebarBtnOverDesignerElement =
  //       isDesignerBtnElement && isDroppingOverDesignerElement;

  //     // Second scenario
  //     if (droppingSidebarBtnOverDesignerElement) {
  //       const type = active.data?.current?.type;
  //       const newElement = FormElements[type as ElementsType].construct(idGenerator());

  //       const overId = over.data?.current?.elementId;

  //       const overElementIndex = elements.findIndex((el) => el.id === overId);
  //       if (overElementIndex === -1) {
  //         throw new Error('element not found');
  //       }

  //       let indexForNewElement = overElementIndex; // i assume i'm on top-half
  //       if (isDroppingOverDesignerElementBottomHalf) {
  //         indexForNewElement = overElementIndex + 1;
  //       }

  //       addElement(indexForNewElement, newElement);
  //       setSelectedElement(newElement);
  //       setOpenDialog(true);
  //       return;
  //     }

  //     // Third scenario
  //     const isDraggingDesignerElement = active.data?.current?.isDesignerElement;

  //     const draggingDesignerElementOverAnotherDesignerElement =
  //       isDroppingOverDesignerElement && isDraggingDesignerElement;

  //     if (draggingDesignerElementOverAnotherDesignerElement) {
  //       const activeId = active.data?.current?.elementId;
  //       const overId = over.data?.current?.elementId;

  //       const activeElementIndex = elements.findIndex((el) => el.id === activeId);

  //       const overElementIndex = elements.findIndex((el) => el.id === overId);

  //       if (activeElementIndex === -1 || overElementIndex === -1) {
  //         throw new Error('element not found');
  //       }

  //       const activeElement = { ...elements[activeElementIndex] };
  //       removeElement(activeId);

  //       let indexForNewElement = overElementIndex; // i assume i'm on top-half
  //       if (isDroppingOverDesignerElementBottomHalf) {
  //         indexForNewElement = overElementIndex + 1;
  //       }

  //       addElement(indexForNewElement, activeElement);
  //     }
  //   },
  // });

  // return (
  //   <div className="flex w-full h-full py-4">
  //     <div
  //       className="px-4 w-full"
  //       onClick={() => {
  //         if (selectedElement) setSelectedElement(null);
  //       }}
  //     >
  //       <div
  //         ref={droppable.setNodeRef}
  //         className={cn(
  //           'bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto',
  //           droppable.isOver && 'ring-4 ring-primary ring-inset'
  //         )}
  //       >
  //         {!droppable.isOver && elements.length === 0 && (
  //           <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
  //             Drop here
  //           </p>
  //         )}

  //         {droppable.isOver && elements.length === 0 && (
  //           <div className="p-4 w-full">
  //             <div className="h-[120px] rounded-md bg-primary/20"></div>
  //           </div>
  //         )}
  //         {elements.length > 0 && (
  //           <div className="flex flex-col  w-full gap-2 p-4">
  //             {elements.map((element) => (
  //               <DesignerElementWrapper key={element.id} element={element} />
  //             ))}
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //     <DesignerSidebar />
  //   </div>
  // );

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        paddingX: 2,
        paddingY: 2,
      }}
    >
      {openDialog && <CreateFieldDialog />}
      <Box
        sx={{
          padding: 2,
          width: '100%',
          minHeight: '100%',
          flexGrow: 1,
          maxWidth: '920px',
          margin: 'auto',
          borderRadius: '10px',
          display: 'flex',
          overflowY: 'auto',
          flexDirection: 'column',
          alignItems: 'center',
          scrollbarWidth: 'none',
          backgroundColor: 'white',
        }}
        gap={2}
      >
        {!startPage ? (
          <Box
            sx={{
              direction: 'rtl',
              display: 'flex',
              flexDirection: 'row-reverse',
              width: '100%',
              position: 'relative',
              alignItems: 'center',
              justifyContent: 'center',
              paddingY: 0.5,
              borderRadius: '5px',
              border: '1px solid #D8D8D8',
            }}
          >
            <Typography
              variant="body2"
              component={'p'}
              sx={{
                fontSize: '1rem',
                padding: 1,
                display: 'flex',
                justifyContent: 'center',
                flexGrow: 1,
              }}
            >
              صفحه شروع پرسشنامه
            </Typography>
            <IconButton
              sx={{ position: 'relative', right: 8 }}
              onClick={() => {
                const newElement = FormElements['TitleFieldStart'].construct(idGenerator());
                setOpenDialog(true);
                setSelectedElement({ fieldElement: newElement, position: null });
              }}
            >
              <Iconify
                icon="uiw:plus-square"
                sx={{ height: '35px', width: '35px', color: (theme) => theme.palette.primary.main }}
              />
            </IconButton>
          </Box>
        ) : (
          <Box
            sx={{
              direction: 'rtl',
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              position: 'relative',
              alignItems: 'center',
              justifyContent: 'center',
              paddingX: 2,
              paddingY: 1,
              borderRadius: '5px',
              border: '1px solid #D8D8D8',
            }}
            marginY={1}
          >
            <Typography
              variant="body2"
              component={'p'}
              sx={{
                fontSize: '1rem',
                padding: 1,
                display: 'flex',
                justifyContent: 'center',
                flexGrow: 1,
              }}
            >
              صفحه شروع پرسشنامه
            </Typography>
            <DesignerElementNoDnD key={startPage.id} element={startPage} />
          </Box>
        )}
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flex: '1 1',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            borderRadius: '10px',
          }}
          gap={2}
        >
          <KanbanBoard />
        </Box>
        {!finishPage ? (
          <Box
            sx={{
              direction: 'rtl',
              display: 'flex',
              flexDirection: 'row-reverse',
              width: '100%',
              position: 'relative',
              alignItems: 'center',
              justifyContent: 'center',
              paddingY: 0.5,
              borderRadius: '5px',
              border: '1px solid #D8D8D8',
            }}
          >
            <Typography
              variant="body2"
              component={'p'}
              sx={{
                fontSize: '1rem',
                padding: 1,
                display: 'flex',
                justifyContent: 'center',
                flexGrow: 1,
              }}
            >
              صفحه پایان پرسشنامه
            </Typography>
            <IconButton
              sx={{ position: 'relative', right: 8 }}
              onClick={() => {
                const newElement = FormElements['TitleFieldFinish'].construct(idGenerator());
                setOpenDialog(true);
                setSelectedElement({ fieldElement: newElement, position: null });
              }}
            >
              <Iconify
                icon="uiw:plus-square"
                sx={{ height: '35px', width: '35px', color: (theme) => theme.palette.primary.main }}
              />
            </IconButton>
          </Box>
        ) : (
          <Box
            sx={{
              direction: 'rtl',
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              position: 'relative',
              alignItems: 'center',
              justifyContent: 'center',
              paddingX: 2,
              paddingY: 1,
              borderRadius: '5px',
              border: '1px solid #D8D8D8',
            }}
          >
            <Typography
              variant="body2"
              component={'p'}
              sx={{
                fontSize: '1rem',
                padding: 1,
                display: 'flex',
                justifyContent: 'center',
                flexGrow: 1,
              }}
            >
              صفحه پایان پرسشنامه
            </Typography>
            <DesignerElementNoDnD key={finishPage.id} element={finishPage} />
          </Box>
        )}
      </Box>
      <DesignerSidebar />
    </Box>
  );
}

// function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
//   const { removeElement, selectedElement, setSelectedElement, setOpenDialog, openDialog } =
//     useDesigner();

//   const topHalf = useDroppable({
//     id: element.id + '-top',
//     data: {
//       type: element.type,
//       elementId: element.id,
//       isTopHalfDesignerElement: true,
//     },
//   });

//   const bottomHalf = useDroppable({
//     id: element.id + '-bottom',
//     data: {
//       type: element.type,
//       elementId: element.id,
//       isBottomHalfDesignerElement: true,
//     },
//   });

//   const draggable = useDraggable({
//     id: element.id + '-drag-handler',
//     data: {
//       type: element.type,
//       elementId: element.id,
//       isDesignerElement: true,
//     },
//   });

//   if (draggable.isDragging) return null; // temporary remove the element from designer

//   const DesignerElement = FormElements[element.type].designerComponent;
//   return (
//     <>
//       <Paper
//         ref={draggable.setNodeRef}
//         {...draggable.listeners}
//         {...draggable.attributes}
//         className="hover:cursor-pointer"
//         onClick={(e) => {
//           e.stopPropagation();
//           setOpenDialog(true);
//           setSelectedElement(element);
//         }}
//         sx={{
//           position: 'relative',
//           display: 'flex',
//           flexDirection: 'column',
//           borderRadius: 1,
//           height: 110,
//           direction: 'ltr',
//           my: 0.1,
//           border: '1px solid #E7E7E7',
//           boxShadow: 'none',
//         }}
//       >
//         <div ref={topHalf.setNodeRef} className="absolute w-full h-1/2 rounded-t-md" />
//         <div ref={bottomHalf.setNodeRef} className="absolute  w-full bottom-0 h-1/2 rounded-b-md" />

//         {topHalf.isOver && (
//           <div className="absolute top-0 w-full rounded-md h-[3px] bg-primary rounded-b-none" />
//         )}
//         <Box sx={{ px: 4, py: 2, display: 'flex', alignItems: 'center' }}>
//           <DesignerElement elementInstance={element} />
//         </Box>
//         {bottomHalf.isOver && (
//           <div className="absolute bottom-0 w-full rounded-md h-[3px] bg-primary rounded-t-none" />
//         )}
//       </Paper>
//     </>
//   );
// }

function DesignerElementNoDnD({ element }: { element: FormElementInstance }) {
  const { removeStartPage, removeFinishPage, setSelectedElement, setOpenDialog } = useDesigner();
  const DesignerElement = FormElements[element.type].designerComponent;

  return (
    <Box
      sx={{
        direction: 'rtl',
        height: '65px',
        flexDirection: 'row-reverse',
        display: 'flex',
        width: '100%',
        borderRadius: '5px',
        border: '1px solid #D8D8D8',
        marginY: 1,
        paddingX: 1,
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement({ fieldElement: element, position: null });
        setOpenDialog(true);
      }}
    >
      {/* <>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
          <p className="text-muted-foreground text-sm">کلیک کنید</p>
        </div>
        <div className="absolute left-0 h-full">
          <Button
            className="flex justify-center h-full border rounded-md rounded-r-none bg-red-500"
            variant={"outline"}
            onClick={(e) => {
              e.stopPropagation(); // avoid selection of element while deleting
              if (element.type === "TitleFieldStart") {
                removeStartPage();
              } else if (element.type === "TitleFieldFinish") {
                removeFinishPage();
              }
            }}
          >
            <BiSolidTrash className="h-6 w-6" />
          </Button>
        </div>
      </> */}

      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          borderRadius: '5px',
          paddingX: 2,
          paddingY: 2,
          height: '100%',
          pointerEvents: 'none',
          justifyContent: 'flex-end',
        }}
      >
        <DesignerElement elementInstance={element} />
      </Box>
      <IconButton
        sx={{
          position: 'relative',
          right: 2,
        }}
      >
        <Iconify icon="ph:dots-three-vertical-bold" sx={{ height: '20px', width: '20px' }} />
      </IconButton>
    </Box>
  );
}

export default Designer;
