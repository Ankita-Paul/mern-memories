import { combineReducers } from "redux";
import posts from "./postReducers.js";
import authReducer from "./authReducer.js";

export default combineReducers({
  posts,
  authReducer,
});
