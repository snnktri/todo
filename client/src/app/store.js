import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/auth.slice"

export const store = configureStore(
    {
        reducer: {
            //here goes reducer
            user: userReducer,
        }
    }
);