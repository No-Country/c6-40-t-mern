import { publicaciones_api } from "./api";

export interface PublicacionesPostData {
  title?: string,
  author_id?: string,
  resume?: string,
  content?: string,
  img?: { url: string, name: string },
  category?: string,
  tags?: [string],
  favorites?: number,
  comments?: [string]
}


export const create_publicacion = async (data: PublicacionesPostData, token: string) => {
  const res = await publicaciones_api.post("/article", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const delete_publicacion = async (publicaciones_id: any, token: string) => {
  const res = await publicaciones_api.delete(`/article/${publicaciones_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};