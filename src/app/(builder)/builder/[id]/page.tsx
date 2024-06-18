import FormBuilderMiddleware from '@/formBuilder/components/FormBuilderMiddleware';
import axios from 'axios';

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

  return <FormBuilderMiddleware formData={response.data} />;
}

export default BuilderPage;
