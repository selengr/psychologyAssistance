import { memo } from 'react';
import { FormElements } from './FormElements';
import SidebarBtnElement from './SidebarBtnElement';
import { Box, Button, Typography } from '@mui/material';
import Line from './line';
import useResponsive from '@/hooks/useResponsive';

const DesignerSidebar = memo(function DesignerSidebar() {
  const isDesktop = useResponsive('up', 'lg');

  return (
    <Box
      dir="rtl"
      sx={{
        position: 'sticky',
        top: isDesktop ? '18px' : '80px',
        height: isDesktop ? '95vh' : '87vh',
        right: '0',
        width: '400px',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '1',
        backgroundColor: 'white',
        overflowY: 'scroll',
        borderRadius: '10px',
        marginRight: '1rem',
        scrollbarWidth: 'none',
        userSelect: 'none',
        boxShadow: (theme) => theme.customShadows.card,
      }}
      padding={2}
      gap={1}
    >
      <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
        <Typography
          variant="subtitle1"
          component={'h3'}
          fontWeight={600}
          color={(theme) => theme.palette.grey[800]}
        >
          پرسشنامه جدید
        </Typography>
        <Line />
      </Box>

      <Box
        sx={{
          border: '1px solid #D8D8D8',
          padding: 2,
          borderRadius: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        gap={2}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }} gap={1.5}>
          <SidebarBtnElement formElement={FormElements.TEXT_FIELD} />
          <SidebarBtnElement formElement={FormElements.MULTIPLE_CHOICE} />
          <SidebarBtnElement formElement={FormElements.SPECTRAL} />
        </Box>
        <Box sx={{ width: '100%' }}>
          <Button
            sx={{
              borderColor: (theme) => theme.palette.primary.main,
              borderWidth: '1px',
              borderStyle: 'solid',
              width: '100%',
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" component={'p'} py={0.5}>
              تنظیمات پرسشنامه
            </Typography>
          </Button>
        </Box>
      </Box>
      <Button
        variant="contained"
        sx={{
          borderColor: (theme) => theme.palette.primary.main,
          borderWidth: '1px',
          borderStyle: 'solid',
          width: '100%',
          borderRadius: 1,
          marginTop: 1.5,
          '&.MuiButtonBase-root:hover': {
            bgcolor: (theme) => theme.palette.primary.main,
          },
        }}
      >
        <Typography variant="body2" component={'p'} py={0.5}>
          ذخیره
        </Typography>
      </Button>
    </Box>
  );
});

export default DesignerSidebar;
