import { createSlice } from "@reduxjs/toolkit"

const bookmarksSlice = createSlice({
    name: "bookmarks",
    initialState: {
        bookmarks: []
    },
    reducers: {
        getbookmarks: (state, action) => {
            state.bookmarks = action.payload.map(video => {
                return {
                    id: video._id,
                    url_video_id: video.id, 
                    type: video.type, 
                    original_title: video.original_title,
                    original_name: video.original_name,
                    overview: video.overview,
                    genre_ids: video.genre_ids,
                    original_language: video.original_language,
                    release_date: video.release_date,
                    first_air_date : video.first_air_date,
                    adult: video.adult,
                    actors: video.actors,
                    poster_path : video.poster_path,
                    backdrop_path: video.backdrop_path,
                    trailer: video.trailer,
                    video: video.video,
                    joinedData: video.joinedData
                }
            })
        },
        RemoveBookmarkedAll (state, action) {
            const video_id = action.payload;
            state.bookmarks = state.bookmarks.filter(video => video.id !== video_id);
        }
    }
})

export const {getbookmarks, RemoveBookmarkedAll} = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
