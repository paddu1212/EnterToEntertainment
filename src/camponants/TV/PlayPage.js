import React, { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import PlayVideo from './Playvideo';
import axios from 'axios';

function PlayPage({ isVisible, onClose, passData }) {
    // console.log(passData);
    const id = passData === null ? '' : passData.url_tv_id;
    const [videoModel, setVideoModel] = useState(false);
    const [videoKey, setVideoKey] = useState('');
    // const [key, setKey] = useState('')
    const [data, setData] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_INVOKE}/api/tv/${id}`);
                const genre = await axios.get(`${process.env.REACT_APP_INVOKE}/api/video/genre/${id}`);
                setVideoKey(response.data.videoKey);
                // setKey(response.data.videoKey.key)
                setData(genre.data.videoKey);
                // console.log(videoKey);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [id]);

    const handleClose = (e) => {
        if (e.target.id === 'wrapper') return onClose();
    };

    if (!isVisible) return null;

    return (
        <>
            <PlayVideo isVisiblevideo={videoModel} onClosevideo={() => setVideoModel(false)} videoName={videoKey?.key} />
            <div className="fixed inset-0 bg-black text-white bg-opacity-25 backdrop-blur-sm h-full w-full z-30" id="wrapper" onClick={(e) => handleClose(e)}>
                <div className="flex flex-row max-md:flex-col bg-black mx-48 my-10 rounded-md max-md:mx-2 max-lg:mx-10 max-md:mt-5">
                    <button className="absolute top-10 right-48 text-white text-xl max-md:right-2 max-md:top-5 max-lg:right-10" onClick={onClose}>
                        <RxCross2 className="font-bold size-6 hover:text-red-600 hover:size-8 hover:font-extrabold hover:-mt-1 hover:-mr-1" />
                    </button>
                    <div className="w-[50%] p-10 max-md:p-2 max-md:w-[80%] max-md:ml-[10%]">
                        <div className="border-2 w-full overflow-hidden max-md:h-60">
                            <img src={`https://image.tmdb.org/t/p/w500/${passData.poster_path}`} alt="img" className="w-96 h-80" />
                        </div>
                        <div>
                            <button className="mt-5 w-full p-2 text-black rounded-md bg-white hover:bg-gray-400 max-md:p-0.5 max-md:text-md max-md:mt-1" onClick={() => setVideoModel(true)}>Watch</button>
                        </div>
                    </div>
                    <div className="w-full p-10 max-md:px-2 max-md:-mt-10">
                        <div className="w-full">
                            <div>
                                <h1 className="text-4xl max-md:text-lg max-md:font-semibold mb-1">{passData.original_name}</h1>
                                <h1 className="text-2xl max-md:text-lg">6.5 / 10</h1>
                            </div>
                            <div className="flex flex-row p-2 max-md:p-0.5">
                                <div className="w-full">
                                    <div className="max-md:text-sm font-semibold">Length</div>
                                    <div className="max-md:text-xs">{videoKey?.size} m</div>
                                </div>
                                <div className="w-full">
                                    <div className="max-md:text-sm font-semibold">Language</div>
                                    <div className="max-md:text-xs">{passData.original_language === 'en' ? 'English' : passData.original_language}</div>
                                </div>
                                <div className="w-full">
                                    <div className="max-md:text-sm font-semibold">Year</div>
                                    <div className="max-md:text-xs">{passData.first_air_date.split('-')[0]}</div>
                                </div>
                                <div className="w-full">
                                    <div className="max-md:text-sm font-semibold">Status</div>
                                    <div className="max-md:text-xs">{passData.adult === 'false' ? 'U/A' : 'U'}</div>
                                </div>
                            </div>
                            <div className="text-md font-semibold mb-2 max-md:mb-0.5 max-md:text-sm">Genre</div>
                            <div className="flex flex-wrap">
                                {data && data.map((item, index) => (
                                    <div className="bg-white rounded-md text-black px-2 py-1 max-md:px-1 max-md:py-0.5 text-xs mx-2 font-medium" key={index}>{item.name}</div>
                                ))}
                            </div>
                            <div className="mt-4 max-md:mt-1">
                                <div className="text-md font-semibold mb-2 max-md:mb-0 max-md:text-sm">Synopsis</div>
                                <div className="text-sm text-justify max-md:text-xs">{passData.overview}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PlayPage;
