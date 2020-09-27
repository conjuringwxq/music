import { useState } from 'react';

export const useUnitCount = (data: number | string) => {
  const [count, setCount] = useState(data.toString());

  if (count.length > 4 && count.length < 9) {
    setCount(`${count.substring(0, count.length - 4)}万`);
  }

  if (count.length > 8) {
    setCount(`${count.substring(0, count.length - 8)}万`);
  }

  return [count, setCount];
};
