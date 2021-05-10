import axios from "axios";

const url = "http://localhost:5000/api/participants";

export const api__get__participants = () => axios.get(url);
export const api__get__one__participants = (id) => axios.get(`${url}/${id}`);
export const api__get__participants__by__param = (id) => axios.get(`${url}/param/${id}`);
export const api__get__my__participation = (id, event) => axios.get(`${url}/param/${id}/${event}`);
export const api__post__participants = (new__participant) => axios.post(url, new__participant);
export const api__patch__participants = (id, updated__participant) => axios.patch(`${url}/${id}`, updated__participant);
export const api__delete__participants = (id) => axios.delete(`${url}/${id}`);