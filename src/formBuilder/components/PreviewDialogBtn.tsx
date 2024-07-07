import React from 'react';
import { Button } from './ui/button';
import { MdPreview } from 'react-icons/md';
import useDesigner from './hooks/useDesigner';
// import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { ElementsType, FormElements } from './FormElements';

function PreviewDialogBtn() {
  const { elements } = useDesigner();

  return <></>;
}

export default PreviewDialogBtn;
