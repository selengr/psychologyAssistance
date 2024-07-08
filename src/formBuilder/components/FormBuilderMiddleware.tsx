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
    const allQuestions = formData?.questionGroups?.map((group: any) => group?.questions);

    // function sortQuestions(questions: any, groups: any) {
    //   return questions?.sort((a: any, b: any) => {
    //     // Sort by group first
    //     if (groups?.indexOf(a?.questionGroupId) < groups?.indexOf(b?.questionGroupId)) {
    //       return -1;
    //     }
    //     if (groups?.indexOf(a?.questionGroupId) > groups?.indexOf(b?.questionGroupId)) {
    //       return 1;
    //     }

    //     // Then sort by position within the group
    //     if (a?.position < b?.position) {
    //       return -1;
    //     }
    //     if (a?.position > b?.position) {
    //       return 1;
    //     }

    //     // If everything else is equal, maintain original order
    //     return 0;
    //   });
    // }
    // const sortedQuestions = sortQuestions(allQuestions[0], allQuestionGroups);

    setElements(allQuestions[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <FormBuilder />;
});

export default FormBuilderMiddleware;
