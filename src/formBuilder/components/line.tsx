import { Box } from '@mui/material';

export default function Line() {
  return (
    <Box
      sx={{
        width: '30px',
        height: '2px',
        display: 'inline-block',
        marginLeft: '4px',
        backgroundColor: (theme) => theme.palette.secondary.main,
      }}
    ></Box>
  );
}
