'use client';
import { useRef } from 'react';
import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
// import ImageEditor from '@uppy/image-editor';
// import Compressor from '@uppy/compressor';
import Persian from '@uppy/locales/lib/fa_IR';
import CustomUppy from './CustomeUppy';
import { fileUploaderRestrictions } from './fileUploader.config';
import { type IUploader } from './types';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/image-editor/dist/style.min.css';

export function UppyUploader({ fileRestriction = fileUploaderRestrictions, sx = {} }: IUploader) {
  const uppy = useRef(
    new Uppy({
      debug: true,
      locale: Persian,
    }).use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })
  );
  uppy.current.setOptions({ restrictions: fileRestriction });

  //   .use(Compressor);
  // //   .use(ImageEditor, {
  // //     cropperOptions: {
  // //       croppedCanvasOptions: {},
  // //       modal: true,
  // //       viewMode: 2,
  // //     },
  // //   }
  // // );

  return <CustomUppy uppy={uppy.current} sx={sx} />;
}
