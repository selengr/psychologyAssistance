// import fpPromise from '@fingerprintjs/fingerprintjs';
// import { UAParser } from 'ua-parser-js';
// import { getDeviceType } from 'rootApp/helpers/deviceType';
// import { IUuidDetectedDevice } from 'rootApp/core/types/globalTypes';

// type TGenerateUuid = () => Promise<string>;
// export const generateUuid: TGenerateUuid = async () => {
//   const fb = await fpPromise.load();
//   const get = await fb.get();
//   const parser = new UAParser().getResult();

//   const dataDeviceClient: IUuidDetectedDevice = {
//     uuid: get.visitorId,
//     os: {
//       type: getDeviceType(parser.ua),
//       name: parser.os.name as string,
//     },
//     browser: {
//       name: parser.browser.name as string,
//       userAgent: parser.ua,
//     },
//   };
//   return JSON.stringify(dataDeviceClient);
// };
