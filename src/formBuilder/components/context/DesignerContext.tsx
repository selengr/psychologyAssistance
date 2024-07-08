'use client';

import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';
import { FormElementInstance } from '../FormElements';
import { callApiQuestionNewPosition, IChangeOrMovePositionApi } from '@/services/apis/builder';

type selectedElementObject = {
  fieldElement: FormElementInstance | null | undefined;
  position: positionObj | null;
};

type positionObj = {
  apiPosition: number;
  realPosition: number;
};

type DesignerContextType = {
  elements: FormElementInstance[];
  startPage: FormElementInstance | null;
  finishPage: FormElementInstance | null;
  questionGroups: number[];

  setQuestionGroups: (value: SetStateAction<number[]>) => void;
  setElements: Dispatch<SetStateAction<FormElementInstance[]>>;
  updateElement: (id: number, element: FormElementInstance) => void;
  addElement: (index: number, element: FormElementInstance) => void;
  removeElement: (id: number) => void;

  addFinishPage: (element: FormElementInstance) => void;
  addStartPage: (element: FormElementInstance) => void;
  updateStartPage: (element: FormElementInstance) => void;
  updateFinishPage: (element: FormElementInstance) => void;
  removeStartPage: () => void;
  removeFinishPage: () => void;

  changeOrMovePositionApiReducer(
    payload: IChangeOrMovePositionApi,
    activeElement: FormElementInstance,
    snapshot: FormElementInstance[]
  ): Promise<void>;

  selectedElement: selectedElementObject | null;
  setSelectedElement: Dispatch<SetStateAction<selectedElementObject | null>>;

  createNewQuestionGroup(id: number): void;
  deleteQuestionGroup(id: any): void;

  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({ children }: { children: ReactNode }) {
  const [elements, setElements] = useState<FormElementInstance[]>([]);
  const [questionGroups, setQuestionGroups] = useState<number[]>([]);
  const [finishPage, setFinishPage] = useState<FormElementInstance | null>(null);
  const [startPage, setStartPage] = useState<FormElementInstance | null>(null);
  const [selectedElement, setSelectedElement] = useState<selectedElementObject | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  async function changeOrMovePositionApiReducer(
    payload: IChangeOrMovePositionApi,
    activeElement: FormElementInstance,
    snapshot: FormElementInstance[]
  ) {
    try {
      await callApiQuestionNewPosition(payload);
      setElements((allQuestions) => {
        const targetQuestion = allQuestions.find(
          (que) => que.questionId === activeElement?.questionId
        );
        delete targetQuestion?.draft;

        return allQuestions;
      });
    } catch (error) {
      setElements(snapshot);
      console.error(error);
    }
  }

  const addFinishPage = (element: FormElementInstance) => {
    setFinishPage(element);
  };

  const addStartPage = (element: FormElementInstance) => {
    setStartPage(element);
  };

  const addElement = (index: number, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  const removeStartPage = () => {
    setStartPage(null);
  };

  const removeElement = (id: number) => {
    setElements((prev) => prev.filter((element) => element?.questionId !== id));
  };

  const removeFinishPage = () => {
    setFinishPage(null);
  };

  const updateStartPage = (element: FormElementInstance) => {
    setStartPage((prevPage) => ({
      ...prevPage,
      ...element,
    }));
  };

  const updateFinishPage = (element: FormElementInstance) => {
    setFinishPage((prevPage) => ({
      ...prevPage,
      ...element,
    }));
  };

  const updateElement = (id: number, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      const index = newElements.findIndex((el) => el?.questionId === id);
      newElements[index] = element;
      return newElements;
    });
  };

  function createNewQuestionGroup(id: number) {
    setQuestionGroups((questionGroups) => [...questionGroups, id]);
  }

  function deleteQuestionGroup(id: any) {
    const newQuestions = elements?.filter((t) => t?.questionId !== id);
    setElements(newQuestions);

    const filteredGroups = questionGroups?.filter((group) => group !== id);
    setQuestionGroups(filteredGroups as number[]);
  }

  return (
    <DesignerContext.Provider
      value={{
        elements,
        setElements,
        addElement,
        removeElement,

        questionGroups,
        setQuestionGroups,

        selectedElement,
        setSelectedElement,
        updateElement,

        startPage,
        addStartPage,
        removeStartPage,
        updateStartPage,

        finishPage,
        addFinishPage,
        removeFinishPage,
        updateFinishPage,

        changeOrMovePositionApiReducer,

        createNewQuestionGroup,
        deleteQuestionGroup,

        openDialog,
        setOpenDialog,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}
