import { combineReducers } from "redux";
import alert from './alert'
import auth from './auth'
import profile from './profile'
import post from './post'
import job from './job'
import interview from "./interview";
import scoreReducer from "./score";

export default combineReducers({
    alert,
    auth,
    profile,
    post,
    job,
    interview,
    score:scoreReducer,
})