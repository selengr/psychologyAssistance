export const cloneObject = (data: { [key: string]: any }) =>
  JSON.parse(JSON.stringify(data));