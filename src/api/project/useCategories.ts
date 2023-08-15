import { useQuery } from "@tanstack/react-query";
import { getCategories } from "./getCategories";

export const useCategories = ({
  params = {},
}: {
  params?: Record<string, any>;
} = {}) => {
  return useQuery(["categories", params], () => getCategories(params));
};
