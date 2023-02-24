import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/configfb";

export interface DataTypeDevice {
    id?: string
    key: number
    MacAddress: string
    address: string
    capacity: number
    duration: string
    memory: string
    nameDevice: string
    password?: string
    sku: string
    status: string
    userName: string
    time?: string
    desc?: string
}

interface IDevice {
    devices: DataTypeDevice[],
}

const initialState: IDevice = {
    devices: [],
} 

export const fetchDevice = createAsyncThunk(
    "device/fetch",
    async () => {
        let listDevice: any = [];
        const query = await getDocs(collection(db, "device"));
        
        query.docs.forEach( doc => {
            listDevice.push({...doc.data(), id: doc.id})
        })
        
        return listDevice;
})


const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDevice.fulfilled, (state, action) => {
          state.devices = action.payload;
        });
      }, 

})

export default deviceSlice;
export const {  } = deviceSlice.actions;