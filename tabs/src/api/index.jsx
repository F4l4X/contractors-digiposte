import axios from 'axios'

const url = "http://localhost:5003/contractors";

export const fetchContractors = () => axios.get(url);
export const createContractor = (newContractor) => axios.post(url, newContractor);
export const updateContractor = (id, updatedContractor) => axios.patch(`${url}/${id}`, updatedContractor);
export const deleteContractor = (id) => axios.delete(`${url}/${id}`)