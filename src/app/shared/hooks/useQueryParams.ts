import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useUpdateParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return useCallback(
    (name: string, value: string) => {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set(name, value);

      setSearchParams(newParams);
    },
    [searchParams]
  );
};

export const useUrlParams = () => {
  const [searchParams] = useSearchParams();

  const getParamInt = useCallback(
    (name: string, defaultValue: number = 1): number => {
      try {
        const value = searchParams.get(name);
        if (!value) {
          return defaultValue;
        }
        return parseInt(value);
      } catch (_) {
        return defaultValue;
      }
    },
    [searchParams]
  );

  return {
    searchParams,
    getParamInt,
  };
};
