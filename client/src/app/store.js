import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/auth.slice"
import todoReducer from "../features/todo.slice";

export const store = configureStore(
    {
        reducer: {
            //here goes reducer
            user: userReducer,
            todo: todoReducer,
        }
    }
);