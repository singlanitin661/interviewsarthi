import {configureStore} from "@reduxjs/toolkit"
import geminiReducer from "./gemini/geminiSlice"

const appStore = configureStore({
    reducer : {
        gemini :  geminiReducer,
    }
})

export default appStore;