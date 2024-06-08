import React from 'react';
import useDesigner from './hooks/useDesigner';
import { FormElementInstance, FormElements } from './FormElements';
import { Box, Divider, Typography } from '@mui/material';

function PropertiesFormSidebar() {
  const { selectedElement } = useDesigner();
  const { fieldElement } = selectedElement;

  const PropertiesForm = FormElements[fieldElement!.type].propertiesComponent;

  return (
    <Box
      sx={{ direction: 'rtl', display: 'flex', flexDirection: 'column', marginTop: '1rem' }}
      padding={2}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography
          variant="body2"
          component={'p'}
          sx={{ fontWeight: 'bold', textAlign: 'center', fontSize: '1.2rem' }}
        >
          {fieldElement!.extraAttributes?.label}
        </Typography>
      </Box>
      <Divider sx={{ marginBottom: '1rem', marginTop: '0.5rem' }} />
      <PropertiesForm elementInstance={fieldElement as FormElementInstance} />
    </Box>
  );
}

export default PropertiesFormSidebar;
