import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/configfb";


type royalties = {
    coppyRight: number,
    perform: number,
    producer: number
}

export interface DataTypeContract {
    id: string
    key: number
    contractID: string
    contractName: string
    fullName: string
    authorizedPerson: string
    accountNumber: string
    bank: string
    birthDay: string
    email: string
    role: string
    royalties: royalties
    sex: number
    startDay: string
    status: string
    userName: string
    nationality: string
    numberPhone: string
    pasword: string
    personID: string
    date: string
    place: string
    taxID: number
    address: string
}

interface IContract {
    contracts: DataTypeContract[],
}

const initialState: IContract = {
    contracts: [],
} 

export const fetchContract = createAsyncThunk(
    "contract/fetch",
    async () => {
        let listContract: any = [];
        const query = await getDocs(collection(db, "contract"));
        
        query.docs.forEach( doc => {
            listContract.push({...doc.data(), id: doc.id})
        })
        
        return listContract;
})


const contractSlice = createSlice({
    name: 'contracts',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchContract.fulfilled, (state, action) => {
          state.contracts = action.payload;
        });
      }, 

})

export default contractSlice;
export const {  } = contractSlice.actions;