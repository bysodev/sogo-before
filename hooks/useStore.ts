import { useState, useEffect } from 'react';

export const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();
    console.log('Esta es la data: ' + JSON.stringify(data))
  useEffect(() => {
    console.log('El resultado que entra: ' + JSON.stringify(result))
    setData(result);
  }, [result]);

  return data;
};