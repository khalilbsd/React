import axios from "axios";

const url = "http://localhost:5000/api/events";

export const api__get__events = () => axios.get(url);
export const api__get__one__event = (id) => axios.get(`${url}/${id}`);
export const api__post__events = (new__event) => axios.post(url, new__event);
export const api__patch__events = (id, updated__event) => axios.patch(`${url}/${id}`, updated__event);
export const api__delete__events = (id) => axios.delete(`${url}/${id}`);