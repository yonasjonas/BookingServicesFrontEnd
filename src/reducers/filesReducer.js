import { ACTION_TYPES } from "../Actions/file";

const initialState = {
    list:[]
}

export const filesReducer = (state = initialState, action) => {    
    switch (action.type) {        
        case ACTION_TYPES.FETCH_ALL_IMAGES:
            return {
                ...state,
                list: [...action.payload]
            }
        case ACTION_TYPES.CREATE_IMAGE:
            return {
                ...state,
                list: [...state.list, action.payload]
            }        
        
        default:
            return state
    }
}
