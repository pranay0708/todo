import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlices"

export const store = configureStore({
    reducer: {
        todos: todoReducer
    }
})