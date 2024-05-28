'use client'
export const toBase64 = (data: {[key:string]: any} | Array<any>) => btoa(unescape(encodeURIComponent(JSON.stringify(data))));
export const base64ToData = (data: string) => {
  try {
    const binaryString = atob(data);
    const jsonString = decodeURIComponent(escape(binaryString));
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error decoding base64-encoded string:', error);
    return null;
  }
};