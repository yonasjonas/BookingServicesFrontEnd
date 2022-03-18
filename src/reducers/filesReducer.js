import { ACTION_TYPES } from "../actions/businessProvidersActions";

const initialState = {
    list:[]
}

export const filesReducer = (state = initialState, action) => {    
    switch (action.type) {        
        case ACTION_TYPES.FETCH_ALL:
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
