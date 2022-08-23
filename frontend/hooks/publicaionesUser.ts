import { type } from "os";
import useSWR from "swr";


export interface Publicaciones{
    _id?: string;
    title?: string;
    author?: string;
    content?: string;
    img?:{url: string , name:string};
    favorites?:number;
    tag?: [];
    comments?:[];
    category?:string;
  }
  
  
  export const publicacionesUser= () => {
    const swr = useSWR<Publicaciones[]>("/api/v1/article/all", {
      refreshInterval: 3000,
    });
  
    return swr;
  };