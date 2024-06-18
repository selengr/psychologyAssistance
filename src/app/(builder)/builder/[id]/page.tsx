import FormBuilderMiddleware from '@/formBuilder/components/FormBuilderMiddleware';
import { FormElementInstance } from '@/formBuilder/components/FormElements';
import axios from 'axios';

export type formResDataTypes = {
  name: string;
  description: string;
  typeValue: string;
  questionGroups: {
    formId: number;
    questionGroupId: number;
    questionFindModelList: FormElementInstance[];
  }[];
};

async function BuilderPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;

  // ? Temporary
  const response = await axios.get('http://172.16.11.24:8080/psya/form/' + id);

  if (!response) {
    throw new Error('form not found');
  }

  return <FormBuilderMiddleware formData={response.data as formResDataTypes} />;
}

export default BuilderPage;
