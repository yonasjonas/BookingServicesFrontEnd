import { combineReducers } from "redux";
import { businessService } from "./businessService";
import { businessProvider } from "./businessProviderReducer";
import { businessBooking } from "./businessBooking";
import { businessInformation } from "./businessInformation";
import { businesses } from "./businesses";
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { filesReducer } from './filesReducer';

export const reducers = combineReducers({
    authentication,
    businessService,
    businessProvider,
    businessBooking,
    businessInformation,
    businesses,
    registration,
    users,
    alert,
    filesReducer,
})



