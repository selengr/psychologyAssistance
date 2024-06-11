'use client';

import { useEffect } from 'react';
import FormBuilder from './FormBuilder';
import useDesigner from './hooks/useDesigner';

export default function FormBuilderMiddleware({ formData }) {
  const { setQuestionGroups, setElements } = useDesigner();

  useEffect(() => {
    const allQuestionGroups = formData?.questionGroups?.map((group: any) => group?.questionGroupId);
    setQuestionGroups(allQuestionGroups);
    const allQuestions = formData?.questionGroups?.map(
      (group: any) => group?.questionFindModelList
    );
    setElements(...allQuestions);
  }, []);

  return (
    <>
      <FormBuilder />
    </>
  );
}
