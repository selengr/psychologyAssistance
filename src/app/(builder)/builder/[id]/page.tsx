import FormBuilderMiddleware from '@/formBuilder/components/FormBuilderMiddleware';
import callApi from '@/services/axios';
import { AxiosResponse } from 'axios';
import React from 'react';

async function BuilderPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const response = await callApi().get('/form/' + id);
  if (!response) {
    throw new Error('form not found');
  }
  return <FormBuilderMiddleware formData={response} />;
}

export default BuilderPage;
