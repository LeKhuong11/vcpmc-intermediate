import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/configfb";

export interface DataTypeInforProducts {
    id?: string,
    key: number,
    type: string,
    desc: string
}

interface IInforProduct {
    inforProducts: DataTypeInforProducts[],
}

const initialState: IInforProduct = {
    inforProducts: [],
} 

export const fetchInforProducts = createAsyncThunk(
    "inforProduct/fetch",
    async () => {
        let listInforProducts: any = [];
        const query = await getDocs(collection(db, "infor-products"));
        
        query.docs.forEach( doc => {
            listInforProducts.push({...doc.data(), id: doc.id})
        })
        
        return listInforProducts;
})


const inforProductsSlice = createSlice({
    name: 'infor-products',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchInforProducts.fulfilled, (state, action) => {
          state.inforProducts = action.payload;
        });
      }, 

})

export default inforProductsSlice;