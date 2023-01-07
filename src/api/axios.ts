import axios from "axios";
import qs from "qs";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  paramsSerializer: {
    serialize: (params) => qs.stringify(params, { encodeValuesOnly: true }),
  },
});

export { api };