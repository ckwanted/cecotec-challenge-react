import { createStore, applyMiddleware, compose, StoreEnhancer, Store } from "redux";
import ReduxThunk from "redux-thunk";
import allReducers from "../reducers";
import { Persistor, persistStore } from "redux-persist";
import history from "../history";
import { routerMiddleware } from "connected-react-router";
import { composeWithDevTools } from "redux-devtools-extension";

let middlewares: any[] = [
    ReduxThunk,
    routerMiddleware(history)
];

if(process.env.NODE_ENV === "development") {
    const { logger } = require("redux-logger");
    middlewares.push(logger);
}

let enhancer: StoreEnhancer<{dispatch: unknown}, {}> = compose(applyMiddleware(...middlewares));

if(process.env.NODE_ENV === "development") {
    enhancer = compose(composeWithDevTools(applyMiddleware(...middlewares)));
}

const store: Store = createStore(
    allReducers,
    enhancer,
);
const persistor: Persistor = persistStore(store);

export {
    store,
    persistor,
}
