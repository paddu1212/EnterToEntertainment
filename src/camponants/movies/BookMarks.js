import React, { useEffect, useState } from 'react';
// import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { RemoveBookmarkedAll, getbookmarks } from '../../redux/Bookmark';
import PlayPage from './PlayPage';
import { FaBookmark } from 'react-icons/fa';
import load from '../images/load1.gif';

const BookMarks = () => {
  const [playPageVisible, setPlayPageVisible] = useState(false);
  const [data, setData] = useState(null); 
  const userName = Cookies.get('userName');
  const dispatch = useDispatch();
  const bookmarkVideo = useSelector((state) => state.bookmarks.bookmarks);
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(true)
    
  useEffect(() => {
    const token = Cookies.get('token');
    const userName = Cookies.get('userName');


    if (!token || !userName) {
        console.log('Token or userName is missing. Please log in first.');
        // Optionally, redirect the user to the login page here
        return; // Exit the useEffect hook early
    }

    const fetchData = async () => {
      try {
            console.log(process.env.REACT_APP_INVOKE);
          const response = await axios.get(`${process.env.REACT_APP_INVOKE}/bookmark/${userName}`);
          // console.log(response.data);
          dispatch(getbookmarks(response.data));
          setLoading(false);
      } catch (err) {
          console.log(err);
          setLoading(false);
      }
    };
    fetchData();

  }, [dispatch]); // Add dependencies token and userName to the array

  const handleRemoveBookmark = (value) => {
    const token = Cookies.get('token')
    const userName = Cookies.get('userName')
    if (!token && !userName) {
        console.log('token is empty...! Please Login First');
    } else {        
        axios.delete(`${process.env.REACT_APP_INVOKE}/bookmark/${value}`)
        .then(response => {
            // window.location.reload()
            dispatch(RemoveBookmarkedAll(response.data.video_id));
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

    return (
        <>
            <PlayPage isVisible={playPageVisible} onClose={()=>setPlayPageVisible(false)} passData={data}/>
            <div className='bg-gray-900 pl-16 pr-8 pt-24 max-sm:pt-14 max-md:px-1 min-h-screen'>
                <div>
                    <h1 className='text-xl p-3'>Bookmarked Videos</h1>
                </div>
                <div className='flex flex-col'>
                    <div className='flex flex-wrap h-auto'>
                        {loading ? <img src={load} alt='Loading...' className='w-97%' />  :
                        bookmarkVideo.map((item, index) => {
                            if(item.joinedData[0] !== undefined && item.joinedData[0].email === userName) {    
                                {if(noData === true){
                                        setNoData(false)
                                    }
                                }                      
                                return(
                                    <div className='bg-gray-800 m-2 p-1 rounded-lg w-[13%] max-lg:w-[20%] max-xl:w-[15%] max-md:w-[95%] mb-5 h-suto shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105' key={index}>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                            alt='prop'
                                            className='w-full h-52 object-cover rounded-lg shadow-lg cursor-pointer'
                                            onClick={() => {
                                            setPlayPageVisible(true)
                                            setData(item)
                                            }}
                                        />
                                        <div>
                                            <button className='bg-gray-700 absolute top-2 right-2 rounded-3xl w-7 h-7'
                                                onClick={() => {
                                                    handleRemoveBookmark(item.id)
                                                }}
                                            >
                                                <FaBookmark className='ml-1.5' />
                                            </button>
                                        </div>

                                        {/* <button className='bg-gray-700 text-white hover:text-gray-950 absolute top-2 right-2 rounded-3xl w-7 h-7'
                                            onClick={()=> handleAddBookmark(item.id)}
                                        >
                                            <FaRegBookmark className='ml-1.5' />
                                        </button> */}
                                        <div className='flex justify-between items-center p-1'>
                                            <div className='flex-col'>
                                            <div className='flex flex-row text-xs'>
                                                <div>{item.release_date === undefined ? item.first_air_date.split('-')[0] : item.release_date.split('-')[0]}</div>
                                                <div className='px-5'>{item.type}</div>
                                                <div>{item.adult === 'false' ? 'U/A' : 'U'}</div>
                                            </div>
                                            <h3 className='w-36 h-7 text-md font-semibold overflow-x-auto whitespace-nowrap' style={{scrollbarWidth: 'none'}}>{item.original_title === undefined ? item.original_name : item.original_title}</h3>
                                            </div>
                                        </div>
                                    </div>

                                )
                            }
                        }
                        
                                    


                        )}
                            
                    {noData ? <div className='text-white text-4xl text-center w-full h-52 pt-10' >No Bookmarked  Videos Found...</div> : ''}
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookMarks;
