import { useEffect, useState } from "react";

export const useTestHook = () => {
  const [works, setWorks] = useState(false);

  useEffect(() => {
    setWorks(true);
  }, []);

  return { works };
};
