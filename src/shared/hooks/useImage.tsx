import { useLayoutEffect, useState } from "react";

const DEFAULT_STATE = { hasLoaded: false, hasError: false };

export const useImage = (src: string) => {
  const [state, setState] = useState(DEFAULT_STATE);

  useLayoutEffect(() => {
    setState(DEFAULT_STATE);

    const image = new Image();
    image.src = src;

    const handleError = () => {
      setState((oldState) => ({ ...oldState, hasError: true }));
    };

    const handleLoaded = () => {
      setState({ hasLoaded: true, hasError: false });
    };

    image.onerror = handleError;
    image.onload = handleLoaded;

    return () => {
      image.removeEventListener("error", handleError);
      image.removeEventListener("load", handleLoaded);
    };
  }, [src]);

  return state;
};
