import { type } from "os";
import useSWR from "swr";


export interface Publicaciones {
  _id?: string;
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


export const publicacionesUser = () => {
  const swr = useSWR<Publicaciones[]>("/article/all", {
    refreshInterval: 3000,
  });

  return swr;
};


export interface Articulos {
  _id?: string;
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

export const articuloUser = () => {
  const swr = useSWR<Articulos[]>("/article", {
    refreshInterval: 3000,
  });

  return swr;
};