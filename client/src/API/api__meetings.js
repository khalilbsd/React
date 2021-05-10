import axios from "axios";

const url= "http://localhost:5000/api/meetings";

export const api__get__meetings = () => axios.get(url);
export const api__post__meetings = (new__meeting) => axios.post(url, new__meeting);
export const api__patch__meetings = (id, updated__meeting) => axios.patch(`${url}/${id}`, updated__meeting);
export const api__delete__meetings = (id) => axios.delete(`${url}/${id}`);