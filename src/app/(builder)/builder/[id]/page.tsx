import FormBuilderMiddleware from '@/formBuilder/components/FormBuilderMiddleware';
import { callApiForm } from '@/services/apis/builder';
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
  const response = callApiForm(id);
  if (!response) {
    throw new Error('form not found');
  }
  return <FormBuilderMiddleware formData={response} />;
}

export default BuilderPage;
