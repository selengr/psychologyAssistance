'use client';

import { useEffect } from 'react';
import FormBuilder from './FormBuilder';
import useDesigner from './hooks/useDesigner';

export default function FormBuilderMiddleware({ formData }: { formData: any }) {
  const { setQuestionGroups, setElements } = useDesigner();

  console.log(formData.questionGroups);

  useEffect(() => {
    const allQuestionGroups = formData?.questionGroups?.map((group: any) => group?.questionGroupId);
    setQuestionGroups(allQuestionGroups);
    const allQuestions: [] = formData?.questionGroups?.map(
      (group: any) => group?.questionFindModelList
    );
    // ? temp
    const updatedElements = allQuestions[0].map((el) => ({
      ...el,
      ['questionId']: el.id,
      id: undefined,
    }));
    setElements(updatedElements);
  }, []);

  return <FormBuilder />;
}
