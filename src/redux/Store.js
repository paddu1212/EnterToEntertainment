import { configureStore } from '@reduxjs/toolkit'
import userReducer from './UserSlice'
import videoReducer from './VideoSlice'
import tvReducer from './tv'
import bookmarksReducer from './Bookmark'
import TrendingReducer from './TrendingSlice'
import RecommendReducer from './RecommendSlice'

const store = configureStore({
    reducer: {
        users : userReducer,
        video: videoReducer,
        tv: tvReducer,
        bookmarks: bookmarksReducer,
        trending: TrendingReducer,
        recommend : RecommendReducer
    }
})
export default store;