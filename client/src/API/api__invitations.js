import axios from "axios";

const url = "http://localhost:5000/api/invitations";

export const api__get__invitations = () => axios.get(url);
export const api__get__invitation__by__requester = (id) => axios.get(`${url}/requester/${id}`);
export const api__get__invitation__by__offerer = (id) => axios.get(`${url}/offerer/${id}`);
export const api__verify__my__participation = (id, post) => axios.get(`${url}/exist/${id}/${post}`);
export const api__get__post__invitation = (id) => axios.get(`${url}/post/${id}/admin/`);
export const api__post__invitations = (new__invitation) => axios.post(url, new__invitation);
export const api__patch__invitations = (id, updated__invitation) => axios.patch(`${url}/${id}`, updated__invitation);
export const api__delete__invitations = (id) => axios.delete(`${url}/${id}`);