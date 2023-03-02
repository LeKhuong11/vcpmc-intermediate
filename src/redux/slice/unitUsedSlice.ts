import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/configfb";

export interface DataTypeUnitUsed {
    id?: string,
    key: number,
    userRoot: string,
    contractID: string,
    admin: number,
    listUser: any,
    deviceAmount: any,
    status: boolean,
}

export interface DataTypeUser {
    key: number
    userName: string
    email: string,
    fullName: string,
    password: string,
    role: string,
    status: boolean,
    update: string,
}


interface IUnitUsed {
    unitUsed: DataTypeUnitUsed[],
}

const initialState: IUnitUsed = {
    unitUsed: [],
} 

export const fetchUnitUsed = createAsyncThunk(
    "unitUsed/fetch",
    async () => {
        let unitUsedTemp: any = [];
        const query = await getDocs(collection(db, "unit-used"));
        
        query.docs.forEach( doc => {
            unitUsedTemp.push({...doc.data(), id: doc.id})
        })
        
        return unitUsedTemp;
})


const unitUsedSlice = createSlice({
    name: 'unit-used',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUnitUsed.fulfilled, (state, action) => {
          state.unitUsed = action.payload;
        });
      }, 

})

export default unitUsedSlice;