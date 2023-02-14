import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/configfb";


interface storeMusic {
    key: number,
    id: string,
    stt: number,
    nameMusic: string,
    IRCID: string,
    time: string,
    singer: string,
    author: string,
    type: string,
    format: string,
    date: boolean,
    update: string,
    listen: string,
}

interface IStoreState {
    store: storeMusic[]
}

const initialState: IStoreState = {
    store: []
} 

export const fetchStoreMusic = createAsyncThunk(
    "store/fetch",
    async () => {
        let store: any = [];
        const query = await getDocs(collection(db, "store-music"));
        
        query.docs.forEach( doc => {
            store.push({...doc.data(), id: doc.id})
        })
    
        return store;
})


const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchStoreMusic.fulfilled, (state, action) => {
          state.store = action.payload;
        });
      }, 

})

export default storeSlice;