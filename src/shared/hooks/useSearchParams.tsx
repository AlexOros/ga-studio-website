import qs, { IStringifyOptions } from "qs";
import { SetStateAction, useCallback, useMemo } from "react";
import { useRouter } from "./useRouter";

export function useSearchParams<S extends Record<string, any>>() {
  const { replace, asPath } = useRouter();
  const search = asPath.split("?")[1] ?? "";

  const searchParams = useMemo(() => {
    return qs.parse(search.replace("?", "")) as S;
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
  paramsObj: Record<string, any>,
  options: IStringifyOptions = {}
) {
  return qs.stringify(paramsObj, { skipNulls: true, ...options });
}
