import { createSlice } from "@reduxjs/toolkit";

const report = createSlice({
    name:"report",
    initialState:{
        score:[],
        count:0,
        report: null,
        toShowEveryhing : false,
    },
    reducers:{
        addScore: (state, action)=>{
            state.score.push(action.payload);
            state.count = state.count+1;
        },
        setReport: (state, action) => {
            state.report = action.payload;
        },
        toggleShowEverything:(state)=>{
            state.toShowEveryhing = true;
        }
    }
})

export const {addScore, setReport,toggleShowEverything} = report.actions;
export default report.reducer;