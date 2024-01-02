import {configureStore} from "@reduxjs/toolkit"
import geminiReducer from "./gemini/geminiSlice"
import startReducer from "./gemini/startSlice"; 
import speakSlice from "./gemini/speakSlice";
import countSlice from "./gemini/countSlice";


const appStore = configureStore({
    reducer : {
        gemini :  geminiReducer,
        start : startReducer,
        speak : speakSlice,
        count : countSlice
    }
})

export default appStore;