import React from 'react';
import useDesigner from './hooks/useDesigner';
import { FormElementInstance, FormElements } from './FormElements';
import { Box, Typography } from '@mui/material';
import Line from './line';

function PropertiesFormSidebar() {
  const { selectedElement } = useDesigner();

  const PropertiesForm =
    FormElements[selectedElement!.fieldElement!.questionType].propertiesComponent;

  const fieldLabel =
    FormElements[selectedElement!.fieldElement!.questionType].designerBtnElement.label;

  return (
    <Box sx={{ direction: 'rtl', display: 'flex', flexDirection: 'column' }} padding={1}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'baseline',
          marginBottom: 3,
        }}
      >
        <Line />
        <Typography
          variant="body2"
          component={'p'}
          sx={{ fontWeight: 'bold', textAlign: 'right', fontSize: '1.2rem' }}
        >
          {fieldLabel}
        </Typography>
      </Box>
      <PropertiesForm elementInstance={selectedElement!.fieldElement as FormElementInstance} />
    </Box>
  );
}

export default PropertiesFormSidebar;
