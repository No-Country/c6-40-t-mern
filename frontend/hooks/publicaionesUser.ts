import { type } from "os";
import useSWR from "swr";


export interface Publicaciones{
    _id: string;
    title: string;
    author: string;
    content: string;
    img: object;
    favorites:number;
    tag: [];
    comments:[];
    category:string;
  }
  
  
  export const publicacionesUser= () => {
    const swr = useSWR<Publicaciones[]>("/api/v1/article", {
      refreshInterval: 3000,
    });
  
    return swr;
  };