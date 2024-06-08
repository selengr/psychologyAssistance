import React from 'react';
import { FormElements } from './FormElements';
import SidebarBtnElement from './SidebarBtnElement';
import { Box, Button, Typography } from '@mui/material';

function DesignerSidebar() {
  return (
    <Box
      dir="rtl"
      sx={{
        width: '400px',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '1',
        backgroundColor: 'white',
        overflowY: 'scroll',
        borderRadius: '10px',
        height: '100%',
        marginRight: '1rem',
        scrollbarWidth: 'none',
      }}
      padding={2}
      gap={1}
    >
      <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
        <Typography variant="subtitle1" component={'h3'} fontWeight={600} color="#353535">
          پرسشنامه جدید
        </Typography>
        <Box
          sx={{
            width: '30px',
            height: '2px',
            display: 'inline-block',
            marginLeft: '4px',
            backgroundColor: '#de43a3',
          }}
        ></Box>
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
          <SidebarBtnElement formElement={FormElements.TextField} />
          <SidebarBtnElement formElement={FormElements.NumberField} />
          <SidebarBtnElement formElement={FormElements.TextAreaField} />
          <SidebarBtnElement formElement={FormElements.DateField} />
          <SidebarBtnElement formElement={FormElements.SelectField} />
          <SidebarBtnElement formElement={FormElements.CheckboxField} />
        </Box>
        <Box sx={{ width: '100%' }}>
          <Button
            sx={{
              borderColor: (theme) => theme.palette.primary.main,
              borderWidth: '1px',
              borderStyle: 'solid',
              width: '100%',
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
}

export default DesignerSidebar;
