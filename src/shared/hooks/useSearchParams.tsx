import { SetStateAction, useCallback, useMemo } from "react";
import { useRouter } from "./useRouter";

export function useSearchParams<S extends Record<string, any>>() {
  const { replace, asPath } = useRouter();
  const search = asPath.split("?")[1] ?? "";

  const searchParams = useMemo(() => {
    const params = new URLSearchParams(search);
    const result: Record<string, any> = {};
    params.forEach((value, key) => {
      result[key] = value;
    });
    return result as S;
  }, [search]);

  const setSearchParams = useCallback(
    (setStateAction: SetStateAction<S>) => {
      const newSearchParams =
        typeof setStateAction === "function"
          ? setStateAction(searchParams)
          : setStateAction;

      replace({
        search: stringifySearchParams(newSearchParams),
      });
    },
    [searchParams, replace]
  );

  return {
    searchParams,
    setSearchParams,
  };
}

export function stringifySearchParams(
  paramsObj: Record<string, any>
) {
  const params = new URLSearchParams();
  Object.entries(paramsObj).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      params.set(key, String(value));
    }
  });
  return params.toString();
}
