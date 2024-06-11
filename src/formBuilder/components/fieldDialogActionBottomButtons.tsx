import { LoadingButton } from '@mui/lab';
import { Box, Button } from '@mui/material';
import useDesigner from './hooks/useDesigner';

export default function FieldDialogActionBottomButtons({ status }: { status: boolean }) {
  const { setOpenDialog, setSelectedElement } = useDesigner();
  return (
    <Box display="flex" gap={2} width="100%" marginTop={5}>
      <LoadingButton
        type="submit"
        fullWidth
        variant="contained"
        loading={status}
        sx={{
          fontWeight: '400',
          fontSize: '15px',
          height: '45px',
          '&.MuiButtonBase-root:hover': {
            bgcolor: (theme) => theme.palette.primary.main,
          },
        }}
      >
        ثبت
      </LoadingButton>

      <Button
        type="button"
        fullWidth
        variant="outlined"
        sx={{ height: '45px', fontWeight: '400', fontSize: '15px' }}
        onClick={() => {
          setOpenDialog(false);
          setSelectedElement(null);
        }}
      >
        انصراف
      </Button>
    </Box>
  );
}
