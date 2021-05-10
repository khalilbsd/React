import axios from "axios";

const url = "http://localhost:5000/api/accounts";

export const api__get__accounts = () => axios.get(url);
export const api__get__one__account = (id) => axios.get(`${url}/${id}`);
export const api__post__accounts = (new__account) => axios.post(url, new__account);
export const api__patch__accounts = (id, updated__account) => axios.patch(`${url}/${id}`, updated__account);
export const api__delete__accounts = (id) => axios.delete(`${url}/${id}`);