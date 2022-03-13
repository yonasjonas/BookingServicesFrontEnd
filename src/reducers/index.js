import { combineReducers } from "redux";
import { businessService } from "./businessService";
import { businessProvider } from "./businessProviderReducer";
import { businessBooking } from "./businessBooking";
import { businessInformation } from "./businessInformation";

export const reducers = combineReducers({
    businessService,
    businessProvider,
    businessBooking,
    businessInformation,
})



