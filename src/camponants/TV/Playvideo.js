import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import ReactPlayer from 'react-player';

function PlayVideo({ isVisiblevideo, onClosevideo, videoName }) {
    
    const handleClose = (e) => {
        if (e.target.id === 'wrapperr') return onClosevideo();
    };  

    if (!isVisiblevideo) return null;


    

    return (
        <>
        <div className='fixed inset-0 bg-white text-white bg-opacity-25 backdrop-blur-md h-full w-full z-40' id='wrapperr' onClick={(e) => handleClose(e)}>
            <div className='flex flex-row bg-black mx-96 h-96 mt-16 rounded-md max-md:mx-4 max-lg:mx-20 max-xl:mx-32'>
                <button 
                        className='absolute top-16 right-96 text-white text-xl z-50 max-md:right-4 max-lg:right-20 max-xl:right-32'
                        onClick={onClosevideo}
                >
                    <RxCross2 className='font-bold size-6 hover:text-red-600 hover:size-8 hover:font-extrabold hover:-mt-1 hover:-mr-1' />
                </button>
                

                <div className='w-full h-full' >
                {videoName && (
                    <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoName}`}
                    controls
                    width="100%"
                    height="100%"
                    />
                )}
                </div>
                
            </div>
        </div>
        </>
    );
}

export default PlayVideo;
