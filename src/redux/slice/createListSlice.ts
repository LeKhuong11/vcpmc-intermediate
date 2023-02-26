import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/configfb";

export interface DataTypeCreateList {
    id?: number,
    key: number,
    listSong: any
    name: string,
    time: string,
}

interface ICreateList {
    createList: DataTypeCreateList[],
}

const initialState: ICreateList = {
    createList: [],
} 

export const fetchCreateList = createAsyncThunk(
    "createList/fetch",
    async () => {
        let createList: any = [];
        const query = await getDocs(collection(db, "create-list"));
        
        query.docs.forEach( doc => {
            createList.push({...doc.data(), id: doc.id})
        })
        
        return createList;
})


const createListSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCreateList.fulfilled, (state, action) => {
          state.createList = action.payload;
        });
      }, 

})

export default createListSlice;