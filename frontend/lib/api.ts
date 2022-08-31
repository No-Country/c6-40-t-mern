import axios from "axios";
const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT
export const publicaciones_api = axios.create({ baseURL: API_ENDPOINT });