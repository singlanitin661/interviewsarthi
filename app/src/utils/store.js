import {configureStore} from "@reduxjs/toolkit"
import geminiReducer from "./gemini/geminiSlice"
import startReducer from "./gemini/startSlice";
import countSlice from "./gemini/countSlice";

const appStore = configureStore({
    reducer : {
        gemini :  geminiReducer,
        start : startReducer,
        count : countSlice
    }
})

export default appStore;