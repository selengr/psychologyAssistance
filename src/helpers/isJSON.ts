export const isJSON = (str: string): boolean => {
  try {
    return JSON.parse(str) && !!str;
  } catch (e) {
    return false;
  }
};
