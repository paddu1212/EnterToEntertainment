import React, { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import PlayVideo from './PlayVideo';
import axios from 'axios';
import Login from '../Login'
import Cookies from 'js-cookie';
import ReviewPage from '../ReviewPage';

function PlayPage({ isVisible, onClose, passData }) {
    // console.log(passData)
    const id = (passData === null) ? '' : passData.url_video_id ;
    // console.log(id);
    const [videoModel, setvideoModel] = useState(false);
    const [videoKey, setVideoKey] = useState('');
    const [data, setData] = useState('');
    const [showModel, setshowModel] = useState(false);
    const userName = Cookies.get('userName')

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = '';
                passData.type === 'movie' ?  
                    response = await axios.get(`${process.env.REACT_APP_INVOKE}/api/videos/${id}`) : 
                    response = await axios.get(`${process.env.REACT_APP_INVOKE}/api/tv/${id}`) ;
                const genre = await axios.get(`${process.env.REACT_APP_INVOKE}/api/video/genre/${id}`);
                if(response.data.videoKey === undefined) {
                    setVideoKey([
                        {id : "5ff7f521383df2003e31909c",
                            iso_639_1
                            : 
                            "en",
                            iso_3166_1
                            : 
                            "US",
                            key
                            : 
                            "Qah9sSIXJqk",
                            name
                            : 
                            "KGF Chapter2 TEASER | English",
                            official
                            : 
                            true,
                            published_at
                            : 
                            "2021-01-07T15:57:35.000Z",
                            site
                            : 
                            "YouTube",
                            size
                            : 
                            2160,
                            type
                            : 
                            "Teaser"
                        }
                    ]);
                } else {
                    setVideoKey(response.data.videoKey);
                }
                setData(genre.data.videoKey);
                // console.log(genre.data.videoKey);
                // console.log(response.data.videoKey);
                // dispatch(getVideo(response.data));
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [id, passData]);
    const handleClose = (e) => {
        if (e.target.id === 'wrapperr') return onClose();
    };  

    if (!isVisible) return null;

    const handleLogin = () => {
        setshowModel(true)
    }
    const LanguageToggle = (language) => {
        if (language === 'en') return 'English';
        if (language === 'kn') return 'Kannada';
        if (language === 'hi') return 'Hindi';
        if (language === 'te') return 'Telagu';
        if (language === 'ml') return 'Malayalam';
        return language
    }
    return (
        <>
        <Login isvisible={showModel} onClose={()=>setshowModel(false)} />
        <PlayVideo isVisiblevideo={videoModel} onClosevideo={()=>setvideoModel(false)} videoName={videoKey?.key} />
        <div className='fixed inset-0 bg-black text-white bg-opacity-25 backdrop-blur-sm h-full w-full z-30 max-md:hidden' id='wrapperr' onClick={(e) => handleClose(e)}>
            <div className='flex flex-col h-[680px] mx-48 mt-5 bg-black rounded-md'>
                <div className='flex flex-row max-md:flex-col  max-md:mx-2 max-lg:mx-10 max-md:mt-5'>
                    <button 
                            className='absolute top-5 right-48 text-white text-xl max-md:right-2 max-md:top-5 max-lg:right-10'
                            onClick={onClose}
                    >
                        <RxCross2 className='font-bold size-6 hover:text-red-600 hover:size-8 hover:font-extrabold hover:-mt-1 hover:-mr-1' />
                    </button>
                    <div className=' w-[50%] px-10 pt-10 max-md:px-2 max-md:pt-1 max-md:w-[80%] max-md:ml-[10%]'>
                        <div className='border-2 w-full overflow-hidden max-md:h-60'>
                            <img src={`https://image.tmdb.org/t/p/w500/${passData.poster_path}`} alt="img" className="w-96 h-80" />
                        </div>
                        {userName === undefined ?
                            <div>
                                <button className='mt-5 w-full p-2 text-black rounded-md bg-white hover:bg-gray-400 max-md:p-0.5 max-md:text-md max-md:mt-1'
                                    onClick={()=>{
                                        handleLogin()
                                    }}
                                >Watch</button>
                            </div> :
                            <div>
                                <button className='mt-5 w-full p-2 text-black rounded-md bg-white hover:bg-gray-400 max-md:p-0.5 max-md:text-md max-md:mt-1'
                                    onClick={()=>{
                                        setvideoModel(true)
                                    }}
                                >Watch</button>
                            </div>
                        }
                        
                    </div>
                    <div className=' w-full p-10 max-md:px-2 max-md:-mt-10'>
                        <div className='w-full'>
                            <div>
                                <h1 className='text-4xl max-md:text-lg max-md:font-semibold mb-1'>{passData.type === 'movie' ? passData.original_title : passData.original_name} </h1>
                                <h1 className='text-2xl max-md:text-lg'>3.9 / 10</h1>
                            </div>
                            <div className='flex flex-row p-2 max-md:p-0.5'>
                                <div className='w-full'>
                                    <div className='max-md:text-sm font-semibold'>Length</div>
                                    <div className='max-md:text-xs'>{videoKey.size} m</div>
                                </div>
                                <div className='w-full'>
                                    <div className='max-md:text-sm font-semibold'>Language</div>
                                    <div className='max-md:text-xs'>
                                        {LanguageToggle(passData?.original_language)}
                                    </div>
                                </div>
                                <div className='w-full'>
                                    <div className='max-md:text-sm font-semibold'>Year</div>
                                    <div className='max-md:text-xs'>
                                        {passData.type === 'movie' ? 
                                            passData.release_date.split('-')[0] :
                                            passData.first_air_date.split('-')[0]
                                        }
                                    </div>
                                </div>
                                <div className='w-full'>
                                    <div className='max-md:text-sm font-semibold'>Status</div>
                                    <div className='max-md:text-xs'>{passData.adult === 'false' ? 'U/A' : 'U'}</div>
                                </div>
                            </div>
                            <div className='text-md font-semibold mb-2 max-md:mb-0.5 max-md:text-sm'>Genre</div>
                            <div className='flex flex-wrap'>

                            {data ? data.map((item, index) => (
                                        <div className='bg-white rounded-md text-black px-2 py-1 mb-2 max-md:px-1 max-md:py-0.5 text-xs mx-2 font-medium' key={index}>{item.name}</div>
                                    )) : null }
                                    
                                
                            </div>

                            <div className='mt-1 max-md:mt-1'>
                                <div className='text-md font-semibold mb-2 max-md:mb-0 max-md:text-sm'>Synopsis</div>
                                <div className='text-sm text-justify max-md:text-xs'>{passData.overview}</div>
                            </div>

                            {/* <div className='mt-4 max-md:mt-1'>
                                <div className='text-md font-semibold mb-2 max-md:mb-0 max-md:text-sm'>Casts</div>
                                <div className='flex flex-wrap'>
                                    {(passData.actors) ? (passData.actors).split(',').map((item) => (
                                        <div className='border border-gray-300 px-2 max-md:px-1 max-md:font-semibold max-md:pb-0.5 rounded-md m-1 max-md:text-xs '>{item}</div>
                                    )) : null}                                                                       
                                </div>
                            </div> */}

                        </div>
                    </div>
                </div>
                <div className='overflow-y-auto'>
                    <ReviewPage videoName={videoKey?.key} />
                </div>
            </div>
        </div>
        </>
    );
}

export default PlayPage;
