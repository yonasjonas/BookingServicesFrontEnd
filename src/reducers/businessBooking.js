import { ACTION_TYPES } from "../Actions/businessBookings";

const initialState = {
    list:[]
}

export const businessBooking = (state = initialState, action) => {    
    switch (action.type) {        
        case ACTION_TYPES.FETCH_ALLBOOKINGS:
            return {
                ...state,
                list: [...action.payload]
            }
        case ACTION_TYPES.CREATE:
            return {
                ...state,
                list: [...state.list, action.payload]
            }        
        case ACTION_TYPES.UPDATE:
            return {
                ...state,
                list: state.list.map(item => item.id === action.payload.id ? action.payload : item)
            }
        case ACTION_TYPES.DELETE:
            return {
                ...state,
                list: state.list.filter(item => item.id !== action.payload)
            }
        default:
            return state
    }
}
