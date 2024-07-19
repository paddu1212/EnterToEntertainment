import { createSlice } from "@reduxjs/toolkit"

const tvSlice = createSlice({
    name: "tv",
    initialState: {
        tv: []
    },
    reducers: {
        gettv: (state, action) => {
            state.tv = action.payload.map(tv => {
                return {
                    id: tv._id,
                    url_tv_id: tv.id, 
                    type: tv.type, 
                    original_name: tv.original_name, 
                    overview: tv.overview,
                    genre_ids: tv.genre_ids,
                    original_language: tv.original_language,
                    first_air_date: tv.first_air_date,
                    adult: tv.adult,
                    actors: tv.actors,
                    poster_path : tv.poster_path,
                    backdrop_path: tv.backdrop_path,
                    trailer: tv.trailer,
                    tv: tv.video,
                    joinedData: tv.joinedData
                }
            })
        },
        AddBookmarkTv (state, action) {
            const {_id, email, video_id, type} = action.payload;
            state.tv = state.tv.map(video => {
                if (video.id === video_id) {
                    video.joinedData.push({'_id' :_id, 'email' : email, 'video_id' : video_id, 'type' : type});
                }
                return video;
            })
        },
        RemoveBookmarkedTv (state, action) {
            const video_id = action.payload;
            state.tv = state.tv.map(video => {
                if (video.id === video_id) {
                    video.joinedData = [];
                }
                return video;
            })
        }
    }
})

export const {gettv, AddBookmarkTv, RemoveBookmarkedTv} = tvSlice.actions;
export default tvSlice.reducer;
