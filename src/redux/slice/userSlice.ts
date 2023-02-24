import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction"
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/configfb";

// export interface IPerson {
//     name: string;
//     birthday: string;
//     displayName: string;
//     email: string;
//     fristName: string;
//     isAdmin: number;
//     lastName: string;
//     phone: number;
//     userName:string;
// }

// interface IUserState {
//     user: IPerson[]
// }
export interface IUser {
    id?: string
    password?: string
    birthday: string;
    displayName: string;
    email: string;
    firstName: string;
    isAdmin: number;
    lastName: string;
    phone: number;
    userName:string;
    avatar?: null
}
interface UserState {
    user: IUser
}
const initialState: any = {
    user: {}
} as UserState

interface IParamsFetchUser  {
    uid: string,
}

//Fetching data from firebase
export const fetchUser = createAsyncThunk(
    "user/fetch",
    async ({uid}: IParamsFetchUser) => {
        let user :any = {};
        const docRef = doc(db, "user", uid);
        try {
            //get a document follow uid
            const doc = await getDoc(docRef);
            user = doc.data();
            user.id = doc.id
        } catch(err) {
            console.log(err);
        }

    return user;
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        deleteUser: (state) => {
            state.user = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<IUser>) => {
          state.user = action.payload;
        });
      }, 
})

export default userSlice;
export const { deleteUser } = userSlice.actions;