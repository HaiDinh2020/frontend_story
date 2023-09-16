import { combineReducers } from "redux";
import storyReducer from "./storyReducer";

const rootReducer = combineReducers({
    stories: storyReducer,
})

export default rootReducer;