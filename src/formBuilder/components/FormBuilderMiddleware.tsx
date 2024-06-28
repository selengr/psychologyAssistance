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

  useEffect(() => {
    const allQuestionGroups = formData?.questionGroups?.map((group: any) => group?.questionGroupId);
    setQuestionGroups(allQuestionGroups);
    const allQuestions = formData?.questionGroups?.map(
      (group: any) => group?.questionFindModelList
    );
    setElements(allQuestions[0]);
  }, []);

  return <FormBuilder />;
});

export default FormBuilderMiddleware;
