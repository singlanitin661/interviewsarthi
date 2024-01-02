import {configureStore} from "@reduxjs/toolkit"
import geminiReducer from "./gemini/geminiSlice"
import startReducer from "./gemini/startSlice"; 
import speakSlice from "./gemini/speakSlice";


const appStore = configureStore({
    reducer : {
        gemini :  geminiReducer,
        start : startReducer,
        speak : speakSlice
    }
})

export default appStore;