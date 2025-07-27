import { useQuery } from "@tanstack/react-query";
import { getCategories } from "./getCategories";

export const useCategories = ({
  params = {},
}: {
  params?: Record<string, any>;
} = {}) => {
  return ["urbanism", "residential", "industrial", "all"];
  // return useQuery(["categories", params], () => getCategories(params));
  // return useQuery(["categories", params], () => getCategories(params));
};
