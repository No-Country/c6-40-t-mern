import axios from "axios";

export const publicaciones_api = axios.create({ baseURL: "http://localhost:5000" });