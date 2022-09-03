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