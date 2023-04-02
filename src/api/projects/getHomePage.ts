import { HomePageEntity } from "@models";
import { api } from "api/axios";
import { QueryParams } from "api/shared/types";

export const getHomePage = async (params: QueryParams = {}) => {
  const {
    data: { data },
  } = await api.get<{
    data: HomePageEntity;
  }>(`/home-page`, {
    params: {
      ...params,
      populate: "deep",
    },
  });

  return data;
};
