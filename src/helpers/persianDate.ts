export const toPersianDate = (date: Date): string => {
    const convert = new Date(date).toLocaleDateString('fa-IR-u-nu-latn',{month: '2-digit', year: 'numeric', day: '2-digit'});
    return convert.replaceAll('/', '-');
  };