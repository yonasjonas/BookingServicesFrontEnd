import { combineReducers } from "redux";
import { businessService } from "./businessService";
import { businessProvider } from "./businessProvider";

export const reducers = combineReducers({
    businessService,
    businessProvider
})



