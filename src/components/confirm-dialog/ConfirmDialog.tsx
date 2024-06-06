// @mui
import { Dialog, Button, DialogTitle, DialogActions, DialogContent } from '@mui/material';
//
import { ConfirmDialogProps } from './types';

// ----------------------------------------------------------------------

export default function ConfirmDialog({
     title,
     content,
     action,
     open,
     onClose,
     cancelText,
     cancelStatus = true,
     ...other
}: ConfirmDialogProps) {
     return (
          <Dialog fullWidth dir="rtl" maxWidth="xs" open={open} onClose={onClose} {...other}>
               <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

               {content && <DialogContent sx={{ typography: 'body2' }}> {content} </DialogContent>}

               <DialogActions>
                    {cancelStatus && (
                         <Button
                              variant="outlined"
                              color="inherit"
                              sx={{ ml: 2 }}
                              onClick={onClose}
                         >
                              {cancelText ?? 'نه، منصرف شدم'}
                         </Button>
                    )}

                    {action}
               </DialogActions>
          </Dialog>
     );
}
