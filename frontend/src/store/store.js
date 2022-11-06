import { applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";

// REDUCERS
import authReducer from './authReducer'
import projectsReducer from "./ProjectReducer";
import userReducer from './userReducer'

let reducers = combineReducers({
    auth: authReducer,
    user: userReducer,
    projects: projectsReducer
})

let store = createStore(reducers, applyMiddleware(thunk))

export default store