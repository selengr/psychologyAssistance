import React from 'react';
import { FormElements } from './FormElements';
import SidebarBtnElement from './SidebarBtnElement';
import { Box, Typography } from '@mui/material';

function DesignerSidebar() {
  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 p-4 bg-background overflow-y-auto h-full rounded-xl">
      <Typography variant="subtitle1" component={'h3'} dir="rtl" fontWeight={600} color="#353535">
        پرسشنامه جدید
      </Typography>

      <Box
        sx={{
          border: '1px solid #D8D8D8',
          padding: 1,
          borderRadius: 1,
          // width : "80%"
        }}
        className="grid grid-cols-1 gap-2 place-items-center pt-4"
      >
        <SidebarBtnElement formElement={FormElements.TextField} />
        <SidebarBtnElement formElement={FormElements.NumberField} />
        <SidebarBtnElement formElement={FormElements.TextAreaField} />
        <SidebarBtnElement formElement={FormElements.DateField} />
        <SidebarBtnElement formElement={FormElements.SelectField} />
        <SidebarBtnElement formElement={FormElements.CheckboxField} />
      </Box>
    </aside>
  );
}

export default DesignerSidebar;
