import { ACTION_TYPES } from "../Actions/businessProvidersActions";

const initialState = {
    list:[]
}

export const businessProvider = (state = initialState, action) => {    
    switch (action.type) {        
        case ACTION_TYPES.FETCH_ALL2:
            return {
                ...state,
                list: [...action.payload]
            }
        case ACTION_TYPES.CREATE2:
            return {
                ...state,
                list: [...state.list, action.payload]
            }        
        case ACTION_TYPES.UPDATE2:
            return {
                ...state,
                list: state.list.map(item => item.id === action.payload.id ? action.payload : item)
            }
        case ACTION_TYPES.DELETE2:
            return {
                ...state,
                list: state.list.filter(item => item.id !== action.payload)
            }
        case ACTION_TYPES.ADD_TIMES:
            //console.log("from provider: ", {state});
            return {
                ...state,
                item: [action.payload]
                


 
                /* ...state,
                list: state.list.map(item =>

                    //item.weekvalue = action.payload.data,
                    console.log({state}, {action})
                ) */

            }
        default:
            return state
    }
}

