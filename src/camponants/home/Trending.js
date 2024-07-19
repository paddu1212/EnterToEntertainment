import React, { useEffect, useState } from 'react'
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import '../../App.css'
import axios from 'axios';
import { AddBookmarkTrend, RemoveBookmarkedTrend, getTrending } from '../../redux/TrendingSlice';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../Login'
import PlayPage from '../movies/PlayPage';
import Cookies from 'js-cookie';
import load from '../images/load1.gif'
import { AddBookmarkRecommend, RemoveBookmarkedRecommend } from '../../redux/RecommendSlice';
import { AddBookmark, RemoveBookmarked } from '../../redux/VideoSlice';

const Trending = () => {
  localStorage.removeItem('adminAuth')
  const userName = Cookies.get('userName')
 
  const [playPageVisible, setPlayPageVisible] = useState(false);
  const [data, setData] = useState(null); 
  
  const [showModel, setshowModel] = useState(false);

  const dispatch = useDispatch();
  const TrendingVideo = useSelector((state)=> state.trending.trending);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_INVOKE}/trending/${userName}`);
            // console.log(response.data);
            dispatch(getTrending(response.data));
            setLoading(false)
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };
    fetchData();
  }, [dispatch, userName])


  const handleAddBookmark = (value, type) => {
    const token = Cookies.get('token')
    const userName = Cookies.get('userName')
    if (!token && !userName) {
        // console.log('token is empty...! Please Login First');
        setshowModel(true)
    } else {        
        axios.post(`${process.env.REACT_APP_INVOKE}/bookmark`, { email: userName, video_id: value, type: type })
        .then(response => {
          // window.location.reload()
          dispatch(AddBookmarkTrend(response.data));
          dispatch(AddBookmarkRecommend(response.data));
          dispatch(AddBookmark(response.data));
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
  }

  const handleRemoveBookmark = (value) => {
    const token = Cookies.get('token')
    const userName = Cookies.get('userName')
    if (!token && !userName) {
        console.log('token is empty...! Please Login First');
    } else {        
        axios.delete(`${process.env.REACT_APP_INVOKE}/bookmark/${value}`)
        .then(response => {
            // window.location.reload();
            dispatch(RemoveBookmarkedTrend(response.data.video_id));
            dispatch(RemoveBookmarkedRecommend(response.data.video_id));
            dispatch(RemoveBookmarked(response.data.video_id));
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
  }

  if (loading) return <img src={load} alt='Loading...' className='w-[97%] h-56' />;

  return (
    <div className='flex flex-col'>
      <Login isvisible={showModel} onClose={()=>setshowModel(false)} />
      <PlayPage isVisible={playPageVisible} onClose={()=>setPlayPageVisible(false)} passData={data}/>
      <div className='flex flex-row h-auto overflow-hidden overflow-x-scroll  sm:scrollbar-hidden max-md:h-auto'>
        {(loading) ? (<img src={load} alt='Loading...' className='w-[97%] h-96' />) : 
          TrendingVideo.map((item, index) => (
          <div className='relative bg-gray-800 m-2 p-1 rounded-lg min-w-[20%] max-w[15%] h-auto max-md:min-w-[75%] max-md:max-w[75%]  max-md:mb-7 transition duration-300 ease-in-out transform hover:scale-105' key={index}>
            <img 
                src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
                alt='prop'
                className='w-full h-40 rounded-lg shadow-lg hover:shadow-xl cursor-pointer'
                onClick={() => {
                setPlayPageVisible(true)
                setData(item)
                }}
            />
              {
              (item.joinedData[0] === undefined) ? (
                  
                  <div>
                      <button className='bg-gray-700 text-white hover:text-gray-950 absolute top-2 right-2 rounded-3xl w-7 h-7' 
                          onClick={() => {
                              handleAddBookmark(item.id, item.type)
                          }}
                      >
                          <FaRegBookmark className='ml-1.5' />
                      </button>
                  </div>
              ) : (
                <button className='bg-gray-700 absolute top-2 right-2 rounded-3xl w-7 h-7'
                    onClick={() => {
                        handleRemoveBookmark(item.id)
                    }}
                >
                    <FaBookmark className='ml-1.5' />
                </button>
              )}
              <div className='flex justify-between items-center p-1 w-full'>
                <div className='flex-col w-full'>
                  <div className='flex flex-row text-xs'>
                      <div className=''>{item.release_date.split('-')[0]}</div>
                      <div className='flex-grow text-center'>{item.type}</div>
                      <div className='mr-2'>{item.adult === 'false' ? 'U/A' : 'U'}</div>
                  </div>
                  <h3 className='text-md font-semibold w-full overflow-x-auto whitespace-nowrap' style={{scrollbarWidth: 'none'}}>{item.original_title}</h3>
                </div>
              </div>
          </div>
        ))}
      </div>
    </div>




  )
}

export default Trending
