import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/configfb";


export interface DataType {
    key: number,
    title: string,
    id?: string,
    idSong: string[],
    time: string,
    topics: string[],
    createAt: string,
    author: string,
}

interface IPlaylist {
    playlist: DataType[]
}

const initialState: IPlaylist = {
    playlist: []
} 

export const fetchPlaylist = createAsyncThunk(
    "playlist/fetch",
    async () => {
        let playlist: any = [];
        const query = await getDocs(collection(db, "play-list"));
        
        query.docs.forEach( doc => {
            playlist.push({...doc.data(), id: doc.id})
        })
        
        return playlist;
})


const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPlaylist.fulfilled, (state, action) => {
          state.playlist = action.payload;
        });
      }, 

})

export default playlistSlice;