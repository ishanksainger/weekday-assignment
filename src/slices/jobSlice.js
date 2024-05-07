import { createSlice } from "@reduxjs/toolkit";

const initialState={
    jobs:[],
    loading:null
}

const jobSlice=createSlice({
    name:"jobsData",
    initialState: initialState,
    reducers:{
        setJobs(state,action){
            state.jobs=action.payload
        },
        setLoading(state,action){
            state.loading=action.payload
        },
    }

})

export const {setJobs,setLoading}=jobSlice.actions
export default jobSlice.reducer;