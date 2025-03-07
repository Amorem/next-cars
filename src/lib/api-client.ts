import ky, { type Options } from "ky";

export const api = {
  get: <TResponse>(url: string, options?: Options) => {
    return ky
      .get(url, {
        ...options,
      })
      .json<TResponse>();
  },
  post: <TResponse>(url: string, options?: Options) => {
    return ky
      .post(url, {
        ...options,
      })
      .json<TResponse>();
  },
};
