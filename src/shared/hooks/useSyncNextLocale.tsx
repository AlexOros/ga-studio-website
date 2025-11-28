import { useEffect } from "react";
import { useAppActions } from "@context";
import { ROUTES } from "@shared/routes";

const useSyncNextLocale = (nextLocale: string | null | undefined) => {
  const { setNextLocalPath } = useAppActions();

  useEffect(() => {
    if (!nextLocale) {
      setNextLocalPath(ROUTES.home);
      return;
    }

    setNextLocalPath(nextLocale);
  }, [nextLocale, setNextLocalPath]);
};

export { useSyncNextLocale };
