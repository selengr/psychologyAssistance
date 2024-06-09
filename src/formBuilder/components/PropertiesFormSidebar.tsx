import React from 'react';
import useDesigner from './hooks/useDesigner';
import { FormElementInstance, FormElements } from './FormElements';
import { Box, Typography } from '@mui/material';
import Line from './line';

function PropertiesFormSidebar() {
  const { selectedElement } = useDesigner();
  const { fieldElement } = selectedElement;

  const PropertiesForm = FormElements[fieldElement!.type].propertiesComponent;

  return (
    <Box
      sx={{ direction: 'rtl', display: 'flex', flexDirection: 'column', marginTop: 5 }}
      padding={1}
    >
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
          {Array.isArray(fieldElement!.questionPropertyList)
            ? `سوال ${
                fieldElement!.questionPropertyList[0].questionPropertyEnum === 'label' &&
                fieldElement!.questionPropertyList[0].value
              }`
            : fieldElement!.questionPropertyList.label}
        </Typography>
      </Box>
      <PropertiesForm elementInstance={fieldElement as FormElementInstance} />
    </Box>
  );
}

export default PropertiesFormSidebar;
