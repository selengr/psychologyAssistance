'use client';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import PropertiesFormSidebar from './PropertiesFormSidebar';
import useDesigner from './hooks/useDesigner';
import Iconify from '@/components/iconify/Iconify';

export default function CreateFieldDialog() {
  const { setOpenDialog, openDialog } = useDesigner();

  const handleClose = () => {
    setOpenDialog(!openDialog);
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      dir="ltr"
      sx={{
        overflow: 'hidden',
        scrollbarWidth: 'none',
        '& .MuiPaper-root': {
          margin: '10px',
        },
        '& .MuiDialog-container': {
          backdropFilter: 'blur(4px)',
          backgroundColor: 'hsl(0deg 0% 100% / 50%)',
        },
      }}
    >
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          left: 8,
          top: 8,
        }}
      >
        <Iconify icon="majesticons:close" />
      </IconButton>
      <DialogContent
        dir="rtl"
        sx={{
          maxHeight: '75vh',
          height: 'auto',
          scrollbarWidth: 'none',
          maxWidth: '100%',
          width: '500px',
        }}
      >
        <PropertiesFormSidebar />
      </DialogContent>
    </Dialog>
  );
}
