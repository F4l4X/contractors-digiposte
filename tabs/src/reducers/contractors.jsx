import { FETCH_ALL, UPDATE, CREATE, DELETE } from "../constants/actionTypes";

export default (contractors = [], action) => {
    switch (action.type) {
        case DELETE:
            return contractors.filter((contractor) => contractor._id !== action.payload);
        case UPDATE:
            return contractors.map((contractor) => contractor._id === action.payload._id ? action.payload : contractor);
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...contractors, action.payload];
        default:
            return contractors;
    }
}