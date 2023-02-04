import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux";
import { TypedUseSelectorHook, useSelector } from "react-redux/es/exports";
import userSlice from "./slice/userSlice";


export type RootState = ReturnType<typeof store.getState>
export const store = configureStore({
    reducer: {
        user: userSlice.reducer
    }
})


export const useAppDispatch: ()=> typeof store.dispatch=useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector