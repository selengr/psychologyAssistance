'use client';

import Designer from './Designer';
import {
  DndContext,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import DragOverlayWrapper from './DragOverlayWrapper';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import Confetti from 'react-confetti';
import { Box } from '@mui/material';
import { createPortal } from 'react-dom';

function FormBuilder() {
  // const [isReady, setIsReady] = useState(false);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 200,
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 200,
      tolerance: 10,
    },
  });

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      delay: 200,
      tolerance: 10,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor, pointerSensor);

  // useEffect(() => {
  //   if (isReady) return;
  //   const elements = JSON.parse(form.content);
  //   setElements(elements);
  //   setSelectedElement(null);
  //   const readyTimeout = setTimeout(() => setIsReady(true), 500);
  //   return () => clearTimeout(readyTimeout);
  // }, [form, setElements, isReady, setSelectedElement]);

  // if (!isReady) {
  //   return (
  //     <div className="flex flex-col items-center justify-center w-full h-full">
  //       <ImSpinner2 className="animate-spin h-12 w-12" />
  //     </div>
  //   );
  // }

  // const shareUrl = `${window.location.origin}/submit/${form.shareURL}`;
  // const shareUrl = ``;

  // if (form.published) {
  //   return (
  //     <>
  //       {/* <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={1000} /> */}
  //        <Confetti recycle={false} numberOfPieces={1000} />
  //       <div className="flex flex-col items-center justify-center h-full w-full">
  //         <div className="max-w-md">
  //           <h1 className="text-center text-4xl font-bold text-primary border-b pb-2 mb-10">
  //             🎊🎊 Form Published 🎊🎊
  //           </h1>
  //           <h2 className="text-2xl">Share this form</h2>
  //           <h3 className="text-xl text-muted-foreground border-b pb-10">
  //             Anyone with the link can view and submit the form
  //           </h3>
  //           <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
  //             <Input className="w-full" readOnly value={shareUrl} />
  //             <Button
  //               className="mt-2 w-full"
  //               onClick={() => {
  //                 navigator.clipboard.writeText(shareUrl);
  //                 toast({
  //                   title: "Copied!",
  //                   description: "Link copied to clipboard",
  //                 });
  //               }}
  //             >
  //               Copy link
  //             </Button>
  //           </div>
  //           <div className="flex justify-between">
  //             <Button variant={"link"} asChild>
  //               <Link href={"/"} className="gap-2">
  //                 <BsArrowLeft />
  //                 Go back home
  //               </Link>
  //             </Button>
  //             <Button variant={"link"} asChild>
  //               <Link href={`/forms/${form.id}`} className="gap-2">
  //                 Form details
  //                 <BsArrowRight />
  //               </Link>
  //             </Button>
  //           </div>
  //         </div>
  //       </div>
  //     </>
  //   );
  // }

  return (
    <DndContext sensors={sensors}>
      <Box component="main" sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'start',
            justifyContent: 'center',
            position: 'relative',
            height: '100%',
            backgroundColor: (theme) => theme.palette.primary.darker,
          }}
        >
          <Designer />
        </Box>
      </Box>
      {createPortal(<DragOverlayWrapper />, document.body)}
    </DndContext>
  );
}

export default FormBuilder;
