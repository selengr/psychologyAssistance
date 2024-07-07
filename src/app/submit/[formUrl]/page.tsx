// import { GetFormContentByUrl } from "@/actions/form";
import { FormElementInstance } from '@/formBuilder/components/FormElements';
import FormSubmitComponent from '@/formBuilder/components/FormSubmitComponent';
import React from 'react';

async function SubmitPage({
  params,
}: {
  params: {
    formUrl: string;
  };
}) {
  // const form = await GetFormContentByUrl(params.formUrl);

  // if (!form) {
  //   throw new Error('form not found');
  // }

  // const formContent = JSON.parse(form.content) as FormElementInstance[];

  return <FormSubmitComponent />;
}

export default SubmitPage;
