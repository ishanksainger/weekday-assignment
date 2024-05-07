import { combineReducers } from "@reduxjs/toolkit";
import jobsReducer from "../slices/jobSlice";

const rootReducer=combineReducers({
    jobs:jobsReducer
})

export default rootReducer;