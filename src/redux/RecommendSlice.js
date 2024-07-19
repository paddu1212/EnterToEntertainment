import { createSlice } from "@reduxjs/toolkit"

const recommendSlice = createSlice({
    name: "recommend",
    initialState: {
        recommend: []
    },
    reducers: {
        getRecommend: (state, action) => {
            state.recommend = action.payload.map(video => {
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
        AddBookmarkRecommend (state, action) {
            const {_id, email, video_id, type} = action.payload;
            state.recommend = state.recommend.map(video => {
                if (video.id === video_id) {
                    video.joinedData.push({'_id' : _id, 'email' : email, 'video_id' : video_id, 'type' : type});
                }
                return video;
            })
        },
        RemoveBookmarkedRecommend (state, action) {
            const video_id = action.payload;
            state.recommend = state.recommend.map(video => {
                if (video.id === video_id) {
                    video.joinedData = [];
                }
                return video;
            })
        }
    }
})

export const {getRecommend, AddBookmarkRecommend, RemoveBookmarkedRecommend} = recommendSlice.actions;
export default recommendSlice.reducer;
