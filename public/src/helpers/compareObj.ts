type TObj =
  | {
      [key: string]: any;
    }
  | Array<any>;
export const compareObj = (obg1: TObj, obj2: TObj) =>
  JSON.stringify(obg1) === JSON.stringify(obj2);
