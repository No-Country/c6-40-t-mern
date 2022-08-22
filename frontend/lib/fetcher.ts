import {  publicaciones_api } from "./api";

export const backend_fetcher = (token: string) => async (key: string) => {
  const res = await publicaciones_api.get(key, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
  
};