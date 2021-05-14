import axios from "axios";

const url= "http://localhost:5000/api/posts";

export const api__get__posts = () => axios.get(url);
export const api__get__one__post = (id) => axios.get(`${url}/${id}`);
export const api__get__verified__posts = (id) => axios.get(`${url}/not/true/${id}`);
export const api__post__posts = (new__post) => axios.post(url, new__post);
export const api__get__my__post = (id) => axios.get(`${url}/param/${id}`);
export const api__patch__posts = (id, updated__post) => axios.patch(`${url}/${id}`, updated__post);
export const api__delete__posts = (id) => axios.delete(`${url}/${id}`);
