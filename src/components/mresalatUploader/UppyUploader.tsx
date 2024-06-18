'use client';
import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
// import ImageEditor from '@uppy/image-editor';
import Compressor from '@uppy/compressor';
// import Persian from '@uppy/locales/lib/fa_IR';
import CustomUppy from './CustomeUppy';
import { fileUploaderRestrictions } from './fileUploader.config';
import { type IUploader } from './types';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/image-editor/dist/style.min.css';

const uppy = new Uppy({
  debug: true,
  //   locale: Persian,
})
  .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })
  .use(Compressor);
//   .use(ImageEditor, {
//     cropperOptions: {
//       croppedCanvasOptions: {},
//       modal: true,
//       viewMode: 2,
//     },
//   }
// );

export function UppyUploader({ fileRestriction = fileUploaderRestrictions, sx = {} }: IUploader) {
  uppy.setOptions({ restrictions: fileRestriction });

  return (
    <>
      <CustomUppy uppy={uppy} sx={sx} />
    </>
  );
}
