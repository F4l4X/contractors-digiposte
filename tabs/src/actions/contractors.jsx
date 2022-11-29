import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";

import * as api from '../api/index.jsx';

export const getContractors = () => async (dispatch) => {
    try {
        const { data } = await api.fetchContractors();

        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const createContractor = (contractor) => async (dispatch) => {
    try {
        const { data } = await api.createContractor(contractor);
        dispatch({ type: CREATE, payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const updateContractor = (id, contractor) => async (dispatch) => {
    try {
        const { data } = await api.updateContractor(id, contractor);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteContractor = (id) => async (dispatch) => {
    try {
        await api.deleteContractor(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
}

