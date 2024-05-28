export const differenceInDays = (date:string) => {
  const today = new Date(new Date().toDateString()).getTime();
  const inputDate = new Date(new Date(date).toDateString()).getTime()
  const diffInMilliseconds = Math.abs(today - inputDate);
  return  Math.round(diffInMilliseconds / (1000 * 60 * 60 * 24));
}