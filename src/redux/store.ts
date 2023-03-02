import { AnyAction, combineReducers, configureStore, ThunkDispatch } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux";
import { TypedUseSelectorHook, useSelector } from "react-redux/es/exports";
import { persistReducer } from "redux-persist";
import storeSlice from "./slice/storeSlice";
import userSlice from "./slice/userSlice";
import storage from 'redux-persist/lib/storage' 
import playlistSlice from "./slice/playlistSlice";
import contractSlice from "./slice/contractSlice";
import deviceSlice from "./slice/deviceSlice";
import createListSlice from "./slice/createListSlice";
import authorizedPartnerSlice from "./slice/authorizedPartnerSlice";
import unitUsedSlice from "./slice/unitUsedSlice";
import usersSlice from "./slice/listUserSlice";


//config redux-persit
const persistConfig = {
    key: 'root',
    storage: storage,
}

const rootReducer = combineReducers({
    user: userSlice.reducer,
	users: usersSlice.reducer,
    storeMusic: storeSlice.reducer,
	playlist: playlistSlice.reducer,
	contracts: contractSlice.reducer,
	devices: deviceSlice.reducer,
	createList: createListSlice.reducer,
	authorizedPartner: authorizedPartnerSlice.reducer,
	unitUsed: unitUsedSlice.reducer
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