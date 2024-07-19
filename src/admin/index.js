import axios from 'axios';
import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import Header from './Header';
import { LuShieldClose } from 'react-icons/lu';
import { IoClose, IoCloseCircle } from 'react-icons/io5';
import { IoMdCloseCircle } from 'react-icons/io';
// import { Link } from 'react-router-dom';

function Index() {
  const url = process.env.REACT_APP_INVOKE;
  console.log(url);
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [length, setLength] = useState(1);
    const adminAuth = localStorage.getItem('adminAuth');
    const [load, setLoad] = useState(false)
    
    const [count, setCount] = useState([]);
    // const [file, setFile] = useState();  

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_INVOKE}/admin/video`);
                setCount(response.data);
                setLength(parseInt(response.data.length/100)+1)
                // console.log(response.data);
                // console.log(length);
            } catch (err) {
                console.log(err);
            } finally {
              setLoad(false)
            }
        };

        fetchData();
    }, [load]); // Empty dependency array to run effect only once after mount

     
    const insertData = async () => {
      try {
          const response = await axios.post(`${process.env.REACT_APP_INVOKE}/videos/insert`, {length: length});
          console.log(response.data);
          // window.location.reload();
          console.log('Movies and Tv Shows added successfully');
          alert('Movies added successful');
          // dispatch(getmovie(response.data));
      } catch (err) {
          console.log(err);
      } finally {
        setLoad(true)
      }
    };

    // const handletrailerUpload = (id) => {
    //   const formdata = new FormData();
    //   formdata.append('trailer', file);
    //   console.log(formdata);
    //   axios.post(`${process.env.REACT_APP_INVOKE}/admin/trailer/${id}`, formdata)
    //       .then(res => {console.log(res) 
    //         window.location.reload()
    //       })
    //       .catch(err => console.log(err));
    // }

    // const handlevideoUpload = (id) => {
    //   const formdata = new FormData();
    //   formdata.append('video', file);
    //   console.log(formdata);
    //   axios.post(`${process.env.REACT_APP_INVOKE}/admin/video/${id}`, formdata)
    //       .then(res => {console.log(res) 
    //         window.location.reload()
    //       })
    //       .catch(err => console.log(err));
    // }

    const handleLanguageChange = (event) => {
      const selectedValue = event.target.value;
      setSelectedLanguage(selectedValue);
      // console.log(selectedValue); // Log the selected value to the console
    };
    const handleDelete = (id) => {
      const confirm = window.confirm('Are you sure for delete this video');
      if (!confirm) return
      axios.delete(`${url}/api/admin/video/delete/${id}`)
        .then(res => {
          console.log('delete video', res.data);
          alert('Movies Deleted successful');          
          })
        .catch(err => console.log(err))
        .finally(setLoad(true))
    }
  
    return (
      <>
        {adminAuth ?
          <>
            <Header/>
              <div className='flex flex-col bg-gray-900 min-h-[577px]'>
                <div className='relative'>
                  {/* <Link to='/AddNew' className='bg-white text-black mt-28 float-end mr-20 rounded-md p-1 hover:text-white hover:bg-gray-400'>Add New</Link> */}
                  <button onClick={()=>insertData()} className='absolute -top-16 right-60 hover:bg-gray-700  text-white rounded-md py-2 px-4 focus:outline-none z-10'>Add Videos</button>
                  <select
                    className="absolute -top-16 right-1/4 bg-gray-700 text-white rounded-md py-2 px-10 focus:outline-none z-10"
                    value={selectedLanguage} // Use selectedLanguage state here
                    onChange={handleLanguageChange} // Call handleLanguageChange on change
                  >
                    <option value="all">All</option>
                    <option value="en">English</option>
                    <option value="kn">Kannada</option>
                    <option value="hi">Hindi</option>
                    <option value="te">Telugu</option>
                    <option value="ml">Malayalam</option>
                  </select>
                </div>
                <div className='bg-gray-900 h-auto px-5 mt-2'>
                    
                    <div className='flex flex-wrap'>
                        {count.map((item, index) => {
                          if(selectedLanguage === 'all' || selectedLanguage === item.original_language) {
                            return (
                              <div key={index} className='bg-gray-950 h-auto w-[16%] m-1 mb-2 py-2 rounded-md max-sm:w-full'>
                                <div className='relative'>
                                  <button 
                                    onClick={()=>handleDelete(item._id)}
                                    className='absolute -top-2 -right-0'
                                  ><IoMdCloseCircle className='bg-gray-950 size-6 rounded-full text-red-500 p-0.5' /></button>
                                </div>
                                <div className=' text-white'>
                                  <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} className='w-[90%] ml-[5%] h-52'alt='prps'/>
                                </div>
                                <div>
                                  <div className='text-center text-lg font-mono'>{item.type === 'movie'? item.original_title : item.original_name}</div>
                                </div>
                                <div className=' flex-col'>
                                  {/* {item.trailer === undefined || item.trailer === null || item.trailer === '' ?
                                    <div className=''>
                                      <label>Trailer</label><br/>
                                      <input type="file" onChange={e => setFile(e.target.files[0])} className='size-20 text-xs h-6'/>
                                      <button onClick={()=>handletrailerUpload(item._id)} 
                                        className='bg-white text-black float-end mr-1 mt-1 text-xs h-5 rounded px-1'
                                      >Upload</button>
                                    </div>
                                  : null
                                  }
                                  {item.video === undefined || item.video === null || item.video === '' ?
                                    <div>
                                      <label>video</label><br/>
                                      <input type="file" onChange={e => setFile(e.target.files[0])} className='size-20 text-xs h-5'/>
                                      <button onClick={()=>handlevideoUpload(item._id)}
                                        className='bg-white text-black float-end mr-1 mt-1 text-xs h-5 rounded px-1'
                                      >Upload</button>
                                    </div>
                                  : null
                                  } */}
                                  {/* <button className='bg-gray-500 p-1 w-[47%] rounded-md float-end mr-1'>video</button> */}
                                </div>
                            </div>
                            )
                          }
                        })}
                    </div>
                </div>
              </div>
            </> :
            <LoginForm />
          }
      </>
    );
}

export default Index;
