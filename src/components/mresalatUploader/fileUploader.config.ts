import { type IFileRestriction } from './types';

//TODO: حداقل و حداکثر سایز باید از آقای صادقی پرسیده شود
export const fileUploaderRestrictions: IFileRestriction = {
  minFileSize: undefined,
  maxFileSize: undefined,
  minNumberOfFiles: 1,
  maxNumberOfFiles: 1,
  maxTotalFileSize: undefined,
  allowedFileTypes: ['.jpeg', '.jpg', '.png', '.xls', '.xlsx', 'video/*'],
};
