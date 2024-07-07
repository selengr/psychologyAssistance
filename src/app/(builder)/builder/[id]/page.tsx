import FormBuilderMiddleware from '@/formBuilder/components/FormBuilderMiddleware';
import { FormElementInstance } from '@/formBuilder/components/FormElements';
import axios from 'axios';
import { BASE_URL_API } from 'config-global';

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

  const response = await axios.get(`${BASE_URL_API}form/` + id);

  if (!response) {
    throw new Error('form not found');
  }

  return <FormBuilderMiddleware formData={response.data as formResDataTypes} />;
}

export default BuilderPage;
