import React, { useEffect, useState } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import PlayPage from './PlayPage';
import Login from '../Login'
import Cookies from 'js-cookie';
import { AddBookmarkTv, RemoveBookmarkedTv, gettv } from '../../redux/tv';
import load from '../images/load1.gif';


const Tv = ( type ) => {
    const [showModel, setshowModel] = useState(false);
    const userName = Cookies.get('userName')
    const dispatch = useDispatch();
    const video = useSelector((state) => state.tv.tv);
    const [loading, setLoading] = useState(true);

    const handleAddBookmark = (value) => {
        const token = Cookies.get('token')
        const userName = Cookies.get('userName')
        if (!token && !userName) {
            // console.log('token is empty...! Please Login First');
            setshowModel(true)
        } else {        
            axios.post(`${process.env.REACT_APP_INVOKE}/bookmark`, { email: userName, video_id: value, type: 'tv' })
            .then(response => {
                // window.location.reload()
                dispatch(AddBookmarkTv(response.data));
            })
            .catch(error => {
                console.log('Error:', error);
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
                // window.location.reload()
                dispatch(RemoveBookmarkedTv(response.data.video_id));
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    }
    
    // const insertData = async () => {
    //     try {
    //         const response = await axios.post(`http://localhost:3001/videos/insert`);
    //         console.log(response.data);
    //         // dispatch(getmovie(response.data));
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_INVOKE}/tv/${userName}`);
                // console.log(response.data);
                dispatch(gettv(response.data));
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };
        fetchData();
    }, [dispatch, userName]);
    
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:5000/videos/test`);
    //             console.log(response.data);
    //             dispatch(getVideo(response.data));
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };
    //     fetchData();
    // }, [dispatch, userName]);

    const [playPageVisible, setPlayPageVisible] = useState(false);
    const [data, setData] = useState(null); 

    
    return (
        <>
            <Login isvisible={showModel} onClose={()=>setshowModel(false)} />
            <PlayPage isVisible={playPageVisible} onClose={()=>setPlayPageVisible(false)} passData={data}/>
            <div className='bg-gray-900 pl-16 pr-10 pt-24 max-sm:pt-14 max-md:px-1 min-h-screen'>
                <div>
                    <h1 className='text-xl p-3'>{(type.type === 'movie') ? 'Tv' : (type.type === 'tv') ? 'Tv Series' : 'Web Series'}</h1>
                </div>
                <div className='flex flex-col'>
                    <div className='flex flex-wrap h-auto'>
                        {/* <button onClick={()=>insertData()} className='bg-gray-800 p-2 px-4'>dsg</button> */}
                        {(loading) ? <img src={load} alt='Loading...' className='w-[97%]' /> :
                            video.map((item, index) => {
                            if (item.type === type.type) {
                                return(
                                    <div className=' bg-gray-800 m-2 p-1 rounded-lg w-[13%] max-lg:w-[20%] max-xl:w-[15%] max-md:w-[95%] mb-5 h-suto shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105' key={index}>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                            alt='prop'
                                            className='w-full h-52 object-cover rounded-lg shadow-lg cursor-pointer'
                                            onClick={() => {
                                            setPlayPageVisible(true)
                                            setData(item)
                                            }}
                                        />
                                        {
                                            // console.log(item.joinedData)
                                        (item.joinedData[0] === undefined) ? (
                                            
                                            <div>
                                                <button className='bg-gray-700 text-white hover:text-gray-950 absolute top-2 right-2 rounded-3xl w-7 h-7' 
                                                    onClick={() => {
                                                        handleAddBookmark(item.id)
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
                                        
                                        {/* <button className='bg-gray-700 text-white hover:text-gray-950 absolute top-2 right-2 rounded-3xl w-7 h-7'
                                            onClick={()=> handleAddBookmark(item.id)}
                                        >
                                            <FaRegBookmark className='ml-1.5' />
                                        </button> */}
                                        <div className='flex justify-between items-center p-1'>
                                            <div className='flex-col'>
                                            <div className='flex flex-row text-xs'>
                                                <div className='flex-grow'>{item.first_air_date.split('-')[0]}</div>
                                                {/* <div className='px-5'>{item.type}</div> */}
                                                <div className='mr-2'>{item.adult === 'false' ? 'U/A' : 'U'}</div>
                                            </div>
                                            <h3 className='w-36 h-7 text-md font-semibold overflow-x-auto whitespace-nowrap' style={{scrollbarWidth: 'none'}}>{item.original_name}</h3>
                                            </div>
                                        </div>
                                    </div>

                                )
                            }}
                        
                        )}
                         
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default Tv;
