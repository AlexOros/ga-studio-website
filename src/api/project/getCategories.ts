import { Pagination, CategoryEntity } from "@models";
import { QueryParams } from "api/shared/types";
import { api } from "api/axios";

async function getCategories<T extends CategoryEntity[]>(
  params: QueryParams = {}
) {
  return api
    .get<{
      data: T;
      meta: Pagination;
    }>("/categories", {
      params,
    })
    .then((d) => d.data);
}

export { getCategories };
