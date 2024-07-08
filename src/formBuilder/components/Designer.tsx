'use client';

import DesignerSidebar from './DesignerSidebar';
import useDesigner from './hooks/useDesigner';
import { ElementsType, FormElementInstance, FormElements } from './FormElements';
import { idGenerator } from '@/formBuilder/lib/idGenerator';
import { UiwPlusSquare } from './icons/UiwPlusSquare';
import KanbanBoard from './kanban/KanbanBoard';
import CreateFieldDialog from './createFieldDialog';
import { PhDotsThreeVerticalBold } from './icons/PhDotsThreeVerticalBold';

function Designer() {
  const { setSelectedElement, setOpenDialog, startPage, finishPage } = useDesigner();

  return (
    <div className="w-full min-h-full flex px-4 py-4 justify-center">
      <CreateFieldDialog />
      <div
        className="p-4 w-full min-h-full flex-grow max-w-[920px] rounded-lg flex overflow-y-auto flex-col items-center bg-white shadow-[0_0_2px_0_rgba(187,187,187,0.2),0_12px_24px_-4px_rgba(187,187,187,0.12)] gap-4"
        style={{ scrollbarWidth: 'none', userSelect: 'none' }}
      >
        {!startPage ? (
          <div
            dir="rtl"
            className="flex flex-row relative w-full items-center justify-center rounded-sm border border-1 border-[#d8d8d8]"
          >
            <p className="text-base p-4 flex justify-center flex-grow">صفحه شروع پرسشنامه</p>
            <button
              onClick={() => {
                const newElement: FormElementInstance = FormElements['TitleFieldStart'].construct({
                  questionId: idGenerator(),
                });
                setOpenDialog(true);
                setSelectedElement({ fieldElement: newElement, position: null });
              }}
            >
              <UiwPlusSquare
                width="30px"
                height="30px"
                style={{
                  left: '8px',
                  position: 'relative',
                  backgroundColor: 'white',
                  color: '#433792',
                }}
              />
            </button>
          </div>
        ) : (
          <div
            dir="rtl"
            className="flex flex-col w-full relative items-center justify-center px-4 py-2 rounded-sm border border-1 border-[#d8d8d8] my-4"
          >
            <p className="text-base p-4 flex justify-center flex-grow">صفحه شروع پرسشنامه</p>
            <DesignerElementNoDnD key={startPage?.questionId} element={startPage} />
          </div>
        )}
        <div className="w-full h-full flex flex-grow flex-1 items-center flex-col justify-start rounded-md gap-2">
          <KanbanBoard />
        </div>
        {!finishPage ? (
          <div
            dir="rtl"
            className="flex flex-row w-full relative items-center justify-center rounded-sm border border-1 border-[#d8d8d8]"
          >
            <p className="text-base p-4 flex justify-center flex-grow">صفحه پایان پرسشنامه</p>
            <button
              onClick={() => {
                const newElement = FormElements['TitleFieldFinish'].construct({
                  questionId: idGenerator(),
                });
                setOpenDialog(true);
                setSelectedElement({ fieldElement: newElement, position: null });
              }}
            >
              <UiwPlusSquare
                width="30px"
                height="30px"
                style={{
                  left: '8px',
                  position: 'relative',
                  backgroundColor: 'white',
                  color: '#433792',
                }}
              />
            </button>
          </div>
        ) : (
          <div
            dir="rtl"
            className="flex flex-col w-full relative items-center justify-center px-4 py-2 rounded-sm border border-1 border-[#d8d8d8]"
          >
            <p className="text-base p-4 flex justify-center flex-grow">صفحه پایان پرسشنامه</p>
            <DesignerElementNoDnD key={finishPage?.questionId} element={finishPage} />
          </div>
        )}
      </div>
      <DesignerSidebar />
    </div>
  );
}

function DesignerElementNoDnD({ element }: { element: FormElementInstance }) {
  const { removeStartPage, removeFinishPage, setSelectedElement, setOpenDialog } = useDesigner();
  const DesignerElement = FormElements[element?.questionType as ElementsType].designerComponent;

  return (
    <div
      dir="rtl"
      className="h-[65px] flex flex-row w-full rounded-sm my-4 px-2 border border-1 border-[#d8d8d8]"
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement({ fieldElement: element, position: null });
        setOpenDialog(true);
      }}
    >
      {/* <>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
          <p className="text-muted-foreground text-sm">کلیک کنید</p>
        </div>
        <div className="absolute left-0 h-full">
          <Button
            className="flex justify-center h-full border rounded-md rounded-r-none bg-red-500"
            variant={"outline"}
            onClick={(e) => {
              e.stopPropagation(); // avoid selection of element while deleting
              if (element.type === "TitleFieldStart") {
                removeStartPage();
              } else if (element.type === "TitleFieldFinish") {
                removeFinishPage();
              }
            }}
          >
            <BiSolidTrash className="h-6 w-6" />
          </Button>
        </div>
      </> */}

      <div
        className="flex w-full items-center rounded-sm px-2 py-2 h-full justify-end"
        style={{ pointerEvents: 'none' }}
      >
        <DesignerElement elementInstance={element} />
      </div>
      <button className="relative left-1">
        <PhDotsThreeVerticalBold />
      </button>
    </div>
  );
}

export default Designer;
