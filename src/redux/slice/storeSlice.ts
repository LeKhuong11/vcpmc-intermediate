import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/configfb";


export interface DataTypeStoreMusic {
    key: number,
    id: string,
    nameMusic: string,
    IRCID: string,
    time: string,
    singer: string,
    author: string,
    date: string,
    dateCreated: string,
    type: string,
    format: string,
    status: boolean,
    update?: string,
    listen?: string,
  }

interface IStoreState {
    store: DataTypeStoreMusic[]
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