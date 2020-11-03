import { combineReducers } from "redux";
import postsDispatch from "./dispatch";

const allReducers = combineReducers({
    posts: postsDispatch,
});

export default allReducers;
