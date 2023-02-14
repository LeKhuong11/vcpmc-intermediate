import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux";
import { TypedUseSelectorHook, useSelector } from "react-redux/es/exports";
import { persistReducer } from "redux-persist";
import storeSlice from "./slice/storeSlice";
import userSlice from "./slice/userSlice";
import storage from 'redux-persist/lib/storage' 


//config redux-persit
const persistConfig = {
    key: 'root',
    storage: storage,
}

const rootReducer = combineReducers({
    user: userSlice.reducer,
    storeMusic: storeSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer) 

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		})
})



export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: ()=> typeof store.dispatch=useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector