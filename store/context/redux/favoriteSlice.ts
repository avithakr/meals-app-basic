import { createSlice } from "@reduxjs/toolkit";

export interface FavoriteState {
    ids: string[];
}

const initialState: FavoriteState = {
    ids: [],
};

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        addFavorite: (state, action) => {
            state.ids.push(action.payload)
        },
        removeFavorite: (state, action) => {
            state.ids.splice(state.ids.indexOf(action.payload), 1)
        }
    }
})

export const { addFavorite, removeFavorite } = favoriteSlice.actions

export default favoriteSlice.reducer