import React from 'react';
import { FormElements } from './FormElements';
import SidebarBtnElement from './SidebarBtnElement';
import { Box, Button, Typography } from '@mui/material';

function DesignerSidebar() {
  return (
    <Box
      dir="rtl"
      className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-3 p-3 bg-background overflow-y-auto h-full rounded-xl"
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
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        className="grid grid-cols-1 gap-2 place-items-center pt-4 grow-[3]"
      >
        <Box className="flex flex-col gap-3 w-full">
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
          marginY: 1,
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
