import { accordionActionsClasses } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

const report = createSlice({
    name:"report",
    initialState:{
        score:0,
        report: null,
    },
    reducers:{
        addScore: (state, action)=>{
            state.score = state.score + action.payload;
        },
        setReport: (state, action) => {
            state.report = action.payload;
        }
    }
})

export const {addScore, setReport} = report.actions;
export default report.reducer;