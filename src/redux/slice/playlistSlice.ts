import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/configfb";
import { DataTypeStoreMusic } from "./storeSlice";


export interface DataTypePlaylist {
    key: number,
    title: string,
    id?: string,
    idSong: DataTypeStoreMusic[],
    time: string,
    topics: string[],
    desc: string
    createAt: string,
    author: string,
}

interface IPlaylist {
    playlist: DataTypePlaylist[],
    tempStoreMusicAddToPlaylist: DataTypeStoreMusic[]
}

const initialState: IPlaylist = {
    playlist: [],
    tempStoreMusicAddToPlaylist: []
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
        tempPlaylist: (state, action) => {
            state.tempStoreMusicAddToPlaylist = action.payload
        },
        cancelTempPlaylist: (state) => {
            state.tempStoreMusicAddToPlaylist = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPlaylist.fulfilled, (state, action) => {
          state.playlist = action.payload;
        });
      }, 

})

export default playlistSlice;
export const { tempPlaylist, cancelTempPlaylist } = playlistSlice.actions;