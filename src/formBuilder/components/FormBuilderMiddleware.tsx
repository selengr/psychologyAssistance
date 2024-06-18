'use client';

import { useEffect, memo } from 'react';
import FormBuilder from './FormBuilder';
import useDesigner from './hooks/useDesigner';
import { formResDataTypes } from '@/app/(builder)/builder/[id]/page';

const FormBuilderMiddleware = memo(function FormBuilderMiddleware({
  formData,
}: {
  formData: formResDataTypes;
}) {
  const { setQuestionGroups, setElements } = useDesigner();

  console.log(formData);

  useEffect(() => {
    const allQuestionGroups = formData?.questionGroups?.map((group: any) => group?.questionGroupId);
    setQuestionGroups(allQuestionGroups);
    const allQuestions: any[] = formData?.questionGroups?.map(
      (group: any) => group?.questionFindModelList
    );
    // ? temp
    const updatedElements = allQuestions[0].map((el: any) => ({
      ...el,
      ['questionId']: el.id,
      id: undefined,
    }));
    setElements(updatedElements);
  }, []);

  return <FormBuilder />;
});

export default FormBuilderMiddleware;
