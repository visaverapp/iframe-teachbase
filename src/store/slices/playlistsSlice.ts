import { createSlice } from '@reduxjs/toolkit';

import {Playlist} from "@/types/playlistTypes";

interface playlistsSliceProps {
  playlists: Playlist[];
  playlist: Playlist | null;
  status: 'loading' | 'idle' | 'failed' | null;
}

const initialState: playlistsSliceProps = {
  playlists: [],
  playlist: null,
  status: null,
};

const playlistsSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {},
});

export default playlistsSlice.reducer;
