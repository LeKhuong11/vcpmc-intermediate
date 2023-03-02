import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/configfb";

export interface DataTypeUsers {
    id?: string
    key: number
    avatar: any,
    firstName: string,
    lastName: string,
    displayName: string,
    phone: string,
    email: string,
    isAdmin: number,
    userName: string,
    birthday: string, 
    password: string
    status: boolean,
    role: string
}

interface IUsers {
    users: DataTypeUsers[],
}

const initialState: IUsers = {
    users: [],
} 

export const fetchUsers = createAsyncThunk(
    "users/fetch",
    async () => {
        let listUser: any = [];
        const query = await getDocs(collection(db, "user"));
        
        query.docs.forEach( doc => {
            listUser.push({...doc.data(), id: doc.id})
        })
        
        return listUser;
})


const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
          state.users = action.payload;
        });
      }, 

})

export default usersSlice;