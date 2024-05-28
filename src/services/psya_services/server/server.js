export const Address = () => {
  const data = {
    local: {
      // endPoint: 'http://localhost:8009/api/',
      endPoint: 'http://10.10.1.20:8009/api',
    },
    server: {
      // endPoint: 'https://api.psya.ir/api/',
      endPoint: 'http://10.10.1.20:8009/api',
    },
  };
  return data;
};

export const Excel = () => {
  const data = {
    endPoint: '/import_file.xlsx',
  };
  return data;
};
