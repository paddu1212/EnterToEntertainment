import { createSlice } from "@reduxjs/toolkit"

const videoSlice = createSlice({
    name: "video",
    initialState: {
        video: []
    },
    reducers: {
        getVideo: (state, action) => {
            state.video = action.payload.map(video => {
                return {
                    id: video._id,
                    url_video_id: video.id, 
                    type: video.type, 
                    original_title: video.original_title, 
                    overview: video.overview,
                    genre_ids: video.genre_ids,
                    original_language: video.original_language,
                    release_date: video.release_date,
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
        AddBookmark (state, action) {
            const { _id, email, video_id, type } = action.payload;
            state.video = state.video.map(v => {
                if (v.id === video_id) {
                    v.joinedData.push({ "_id": _id, "email": email, "video_id": video_id, "type": type });
                }
                return v;
            });
        },
        RemoveBookmarked (state, action) {
            const video_id = action.payload;
            state.video = state.video.map(v => {
                if (v.id === video_id) {
                    v.joinedData = [] ;
                    // console.log(video_id);
                }
                return v;
            });
        }
    }
})

export const {getVideo, AddBookmark, RemoveBookmarked} = videoSlice.actions;
export default videoSlice.reducer;
