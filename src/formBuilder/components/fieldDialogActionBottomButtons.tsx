import { LoadingButton } from '@mui/lab';
import { Box, Button, Typography } from '@mui/material';
import useDesigner from './hooks/useDesigner';

export default function FieldDialogActionBottomButtons({ status }: { status: boolean }) {
  const { setOpenDialog, setSelectedElement } = useDesigner();

  return (
    <Box display="flex" gap={3} width="100%" marginTop={5}>
      <LoadingButton
        type="submit"
        fullWidth
        disableRipple
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
        <Typography variant="body2" component={'p'} py={0.5}>
          ثبت
        </Typography>
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
        <Typography variant="body2" component={'p'} py={0.5}>
          انصراف
        </Typography>
      </Button>
    </Box>
  );
}
