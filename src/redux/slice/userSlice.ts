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
type User = {
    name: string;
    birthday: string;
    displayName: string;
    email: string;
    fristName: string;
    isAdmin: number;
    lastName: string;
    phone: number;
    userName:string;
    avatar: null
}
interface UserState {
    user: User
}
const initialState: any = {
    user: {}
} as UserState


//Fetching data from firebase
export const fetchUser = createAsyncThunk(
    "user/fetch",
    async (uid: string) => {
        let user :any = {};
        const docRef = doc(db, "user", uid);
        try {
            //get a document follow uid
            const doc = await getDoc(docRef);
            user = doc.data();
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
        builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
          state.user = action.payload;
        });
      }, 
})

export default userSlice;
export const { deleteUser } = userSlice.actions;