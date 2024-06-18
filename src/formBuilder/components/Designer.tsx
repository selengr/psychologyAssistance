'use client';

import DesignerSidebar from './DesignerSidebar';
import useDesigner from './hooks/useDesigner';
import { FormElementInstance, FormElements } from './FormElements';
import { idGenerator } from '@/formBuilder/lib/idGenerator';
import { Box, IconButton, Typography } from '@mui/material';
import Iconify from '@/components/iconify/Iconify';
import KanbanBoard from './kanban/KanbanBoard';
import { IFormElementConstructor } from '@/@types/bulider';
import CreateFieldDialog from './CreateFieldDialog';

function Designer() {
  const { setSelectedElement, setOpenDialog, openDialog, startPage, finishPage } = useDesigner();

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
          boxShadow: (theme) => theme.customShadows.primary,
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
                const newElement = FormElements['TitleFieldStart'].construct(
                  idGenerator() as any
                );
                setOpenDialog(true);
                setSelectedElement({ fieldElement: newElement, position: null });
              }}
            >
              <Iconify
                icon="uiw:plus-square"
                sx={{
                  borderRadius: '5px',
                  height: '35px',
                  width: '35px',
                  color: (theme) => theme.palette.primary.main,
                }}
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
            <DesignerElementNoDnD key={startPage?.questionId} element={startPage} />
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
                const newElement = FormElements['TitleFieldFinish'].construct(
                  idGenerator() as any
                );
                setOpenDialog(true);
                setSelectedElement({ fieldElement: newElement, position: null });
              }}
            >
              <Iconify
                icon="uiw:plus-square"
                sx={{
                  borderRadius: '5px',
                  height: '35px',
                  width: '35px',
                  color: (theme) => theme.palette.primary.main,
                }}
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
            <DesignerElementNoDnD key={finishPage?.questionId} element={finishPage} />
          </Box>
        )}
      </Box>
      <DesignerSidebar />
    </Box>
  );
}

function DesignerElementNoDnD({ element }: { element: FormElementInstance }) {
  const { removeStartPage, removeFinishPage, setSelectedElement, setOpenDialog } = useDesigner();
  const DesignerElement = FormElements[element.questionType].designerComponent;

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
