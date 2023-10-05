'use client'
import { useState, useEffect } from 'react';

export const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>(result);
//   console.log(`Este es el resultado al comienzo: ${ JSON.stringify( result )}`)
//   console.log(`Esta es la data: ${JSON.stringify( data )}`)
  useEffect(() => {
    // console.log(`Este es el resultado despues: ${result}`)
    setData(result);
  }, [result]);

  return data;
};