import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/configfb";

export interface DataTypeAuthorizedPartner {
    id?: number,
    key: number,
    fullName: string,
    userName: string,
    email: string,
    date: string,
    numberPhone: string,
    status: boolean,
}

interface ICreateList {
    authorizedPertnerList: DataTypeAuthorizedPartner[],
}

const initialState: ICreateList = {
    authorizedPertnerList: [],
} 

export const fetchAuthorizedPertnerList = createAsyncThunk(
    "authorizedPertnerList/fetch",
    async () => {
        let tempList: any = [];
        const query = await getDocs(collection(db, "authorized-partner"));
        
        query.docs.forEach( doc => {
            tempList.push({...doc.data(), id: doc.id})
        })
        
        return tempList;
})


const authorizedPartnerSlice = createSlice({
    name: 'authorizedPartner',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAuthorizedPertnerList.fulfilled, (state, action) => {
          state.authorizedPertnerList = action.payload;
        });
      }, 

})

export default authorizedPartnerSlice;