'use client';

import { useEffect } from 'react';
import FormBuilder from './FormBuilder';
import useDesigner from './hooks/useDesigner';

export default function FormBuilderMiddleware({ formData }) {
  const { setQuestionGroups, questionGroups } = useDesigner();

  useEffect(() => {
    setQuestionGroups(formData?.questionGroups?.map((group: any) => group.questionGroupId));
  }, []);

  return (
    <>
      <FormBuilder />
    </>
  );
}
