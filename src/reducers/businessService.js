import { ACTION_TYPES } from "../actions/businessServices";

const initialState = {
    list:[]
}

export const businessService = (state = initialState, action) => {
    
    switch (action.type) {        
        case ACTION_TYPES.FETCH_ALL:
            return {
                ...state,
                list: [...action.payload]
            }

        default:
            return state
    }
}
