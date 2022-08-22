import {  publicaciones_api } from "./api";

export interface PublicacionesPostData {
    _id: string;
    title?: string;
    author?: string;
    content?: string;
    img?: object;
    favorites?:number;
    tag?: [];
    comments?:[];
    category?:string;
}


export const create_publicacion = async (data: PublicacionesPostData, token: string) => {
  const res = await publicaciones_api.post("/api/v1/article", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const delete_publicacion = async (product_id: any , token:string ) => {
  const res = await publicaciones_api.delete(`/api/v1/article/${product_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};