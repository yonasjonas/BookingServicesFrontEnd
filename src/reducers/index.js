import { combineReducers } from "redux";
import { businessService } from "./businessService";
import { businessProvider } from "./businessProvider";
import { businessBooking } from "./businessBooking";

export const reducers = combineReducers({
    businessService,
    businessProvider,
    businessBooking
})



