import axios from "axios";

const url= "http://localhost:5000/api/eventmarketplaces";

export const api__get__eventmarketplaces = () => axios.get(url);
export const api__post__eventmarketplaces = (new__eventmarketplace) => axios.post(url, new__eventmarketplace);
export const api__patch__eventmarketplaces = (id, updated__eventmarketplace) => axios.patch(`${url}/${id}`, updated__eventmarketplace);
export const api__delete__eventmarketplaces = (id) => axios.delete(`${url}/${id}`);