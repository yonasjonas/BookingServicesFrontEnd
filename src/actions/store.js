import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reducers } from "../Reducers";

export const store = createStore(
    reducers,
    compose(
        applyMiddleware(thunk),
        //line below enables redux tools
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

