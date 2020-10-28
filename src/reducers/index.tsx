import { combineReducers, Reducer } from "redux";
import { connectRouter } from "connected-react-router";
import history from "../history";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import dashboardReducer from "./dashboardReducer";

/*
 * REDUX PERSIST
 */
import { persistReducer, WebStorage } from "redux-persist";
import storage from "redux-persist/lib/storage";

interface ConfigType {
    key: string,
    storage: WebStorage,
    blacklist: string[]
}

type authReducerType = ReturnType<typeof authReducer>;

const authReducerConfig: ConfigType = {
    key: "auth",
    storage,
    blacklist: ["password", "isLoading"],
}

const persistedAuthReducer: Reducer<ConfigType, authReducerType> = persistReducer(authReducerConfig, authReducer);

const rootReducer = combineReducers({
    router: connectRouter(history),
    authReducer: persistedAuthReducer,
    userReducer,
    dashboardReducer,
});

const rootPersistConfig: ConfigType = {
    key: "root",
    storage: storage,
    blacklist: [ // "reducers" that you don't want to persist
        "router",
        "authReducer",
        "userReducer",
        "dashboardReducer",
    ],
}

export default persistReducer(rootPersistConfig, rootReducer);