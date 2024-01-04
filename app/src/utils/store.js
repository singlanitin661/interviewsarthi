import {configureStore} from "@reduxjs/toolkit"
import geminiReducer from "./gemini/geminiSlice"
import startReducer from "./gemini/startSlice";
import countSlice from "./gemini/countSlice";
import report from "./Slices/ReportSlice"


const appStore = configureStore({
    reducer : {
        gemini :  geminiReducer,
        start : startReducer,
        count : countSlice, 
        report: report
    }
})

export default appStore;