'use client';
import { Box, Dialog, DialogContent, IconButton } from '@mui/material';
import PropertiesFormSidebar from './PropertiesFormSidebar';
import useDesigner from './hooks/useDesigner';
import Iconify from '@/components/iconify/Iconify';

export default function CreateFieldDialog() {
  const { setOpenDialog, openDialog, setSelectedElement } = useDesigner();

  const handleClose = () => {
    setOpenDialog(!openDialog);
    setSelectedElement(null);
  };

  return (
    <Dialog
      open={openDialog}
      dir="ltr"
      sx={{
        overflow: 'hidden',
        scrollbarWidth: 'none',
        '& .MuiPaper-root': {
          margin: '10px',
          boxShadow: (theme) => theme?.customShadows?.dialog,
        },
        '& .MuiDialog-container': {
          backdropFilter: 'blur(4px)',
          backgroundColor: 'hsl(0deg 0% 100% / 50%)',
        },
      }}
    >
      {openDialog && (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{ marginX: 0.5, marginTop: 0.5, marginBottom: 0 }}
            >
              <Iconify icon="mingcute:close-line" sx={{ width: 25, height: 25 }} />
            </IconButton>
          </Box>
          <DialogContent
            dir="rtl"
            sx={{
              maxHeight: '75vh',
              height: 'auto',
              scrollbarWidth: 'none',
              maxWidth: '100%',
              width: '450px',
              paddingX: 1,
              paddingBottom: 1,
              paddingTop: 0,
            }}
          >
            <PropertiesFormSidebar />
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}
