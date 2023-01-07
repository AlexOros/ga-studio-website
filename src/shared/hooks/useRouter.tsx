import { NextRouter, useRouter as nextUseRouter } from "next/router";

export const useRouter = () => {
  return nextUseRouter() as NextRouter & { locale: "en" | "ro" };
};
