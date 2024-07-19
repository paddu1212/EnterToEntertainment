import { IoMdSearch } from "react-icons/io";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdMenuOpen } from "react-icons/md";
import Login from "./Login";
import Cookies from "js-cookie";
// import axios from 'axios';

const Navbar = () => {
    const adminAuth = localStorage.getItem('adminAuth');
    // const [auth, setAuth] = useState(true);
    // console.log(data);
    // const token = Cookies.get('token');
    // useEffect(() => {
    //     const fetchData = async () => {
    //     try {
    //         const response = await axios.get('https://entertainmentbackendott.onrender.com/check-token-validity', {
    //         headers: {
    //             'authorization': `Bearer ${token}`
    //         }
    //         });
    //         const temp = (response.data.valid === true && response.status === 200) ? true : false;
    //         setAuth(temp);
    //         // console.log((response.data.valid));
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    //     };

    //     fetchData();
    // }, [token]);
    let pathname = 'home';
    const path = window.location.pathname;
    if (path === '/') {
        pathname = 'home';
    } else if (path === '/Movies') {
        pathname = 'movies';
    } else if (path === '/Tv') {
        pathname = 'tv';
    } else if (path === '/BookMarks') {
        pathname = 'book';
    }
    console.log(path);
    const [activeButton, setActiveButton] = useState(pathname)
    const [isOpen, setIsOpen] = useState(false);

    const [showModel, setshowModel] = useState(false);

    const userName = Cookies.get('userName') ? Cookies.get('userName'): null;

    const navigate = useNavigate();

    //   const toggleNavbar = () => {
    //     setIsOpen(!isOpen);
    //   };

    const handleMenu = () => {
        setIsOpen(!isOpen);
    }
  
  return (
    <nav className={`${adminAuth ? 'hidden' : ''}`}>
        <Login isvisible={showModel} onClose={()=>setshowModel(false)} />
        
        <div className="flex flex-row bg-gray-700 w-full px-10 py-2 shadow-2xl fixed z-30">
            <div className="w-full ml-10 py-1">
                <Link to='/' className="text-white w-full text-3xl font-serif">Enter To Entertainment</Link>
            </div>
            <div className="w-4/12 max-sm:hidden">
                {/* <div className="flex flex-row">
                    <IoMdSearch className='text-white size-7 mt-2' />
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-gray-700 text-white py-2 px-4 rounded-l-md focus:outline-none "
                    />
                </div>
                <hr /> */}
                
            </div>
            <div className="cursor-pointer sm:hidden " onClick={()=>handleMenu()} >
                <MdMenuOpen className='size-10'/>
            </div>
            {/* <MdMenuOpen /> */}
        </div>
        <div className="flex flex-row w-full bg-gray-800 scroll-auto px-10 shadow-xl max-sm:hidden fixed z-30 mt-14">
            <div className={`w-[8%] hover:bg-gray-700 py-2 max-lg:w-[15%] text-center rounded-b-xl ${activeButton === 'home' ? 'bg-gray-700' : ''}`}>
            <Link to='/' onClick={() => setActiveButton('home')} className="text-white text-md max-md:text-sm">Home</Link>
        </div>
        <div className={`w-[8%] hover:bg-gray-700 py-2 max-lg:w-[15%] text-center rounded-b-xl ${activeButton === 'movies' ? 'bg-gray-700' : ''}`}>
            <Link to='/Movies' onClick={() => setActiveButton('movies')} className="text-white text-md max-md:text-sm">Movies</Link>
        </div>
        <div className={`w-[8%] hover:bg-gray-700 py-2 max-lg:w-[15%] text-center rounded-b-xl ${activeButton === 'tv' ? 'bg-gray-700' : ''}`}>
            <Link to='/Tv' onClick={() => setActiveButton('tv')} className="text-white text-md max-md:text-sm">Tv Series</Link>
        </div>
        {/* <div className={`w-[8%] hover:bg-gray-700 py-2 max-lg:w-[15%] text-center rounded-b-xl ${activeButton === 'web' ? 'bg-gray-700' : ''}`}>
            <Link to='/Web' onClick={() => setActiveButton('web')} className="text-white text-md max-md:text-sm">Web Series</Link>
        </div> */}
            {userName ? (
                <div className={`w-[8%] hover:bg-gray-700 py-2 max-lg:w-[15%] text-center rounded-b-xl ${activeButton === 'book' ? 'bg-gray-700' : ''}`}>
                    <Link to='/BookMarks' onClick={() => setActiveButton('book')} className="text-white text-md max-md:text-sm">Book Marks</Link>
                </div>
            ) : (
                <div className={`w-[8%] hover:bg-gray-700 py-2 max-lg:w-[15%] text-center rounded-b-xl cursor-pointer ${activeButton === 'book' ? 'bg-gray-700' : ''}`}
                    onClick={()=> {setshowModel(true)}}
                >
                    <div to='/BookMarks' className="text-white text-md max-md:text-sm">Book Marks</div>
                </div>                    
            )} 
            <div className={`w-[8%] hover:bg-gray-700 py-2 max-lg:w-[15%] text-center rounded-b-xl ${activeButton === 'sign' ? 'bg-gray-700' : ''}`}>
                {userName? (
                    <div onClick={()=>{
                        Cookies.remove('userName')
                        Cookies.remove('token')
                        navigate('/')
                        setActiveButton('home')
                    }} className="text-white text-md max-md:text-sm cursor-pointer">SignOut</div>
                ): (
                    <div onClick={()=>{
                        setshowModel(true)
                        setActiveButton('home')
                    }} className="text-white text-md max-md:text-sm cursor-pointer">Sign In</div>
                )}
            </div>              
        </div>
        <div className={`flex flex-col w-full bg-gray-800 scroll-auto py-2 shadow-xl sm:hidden ${isOpen ? 'block' : 'hidden'} ${isOpen ? 'pt-14' : ''} fixed z-20`} >
            <div className="w-full h-10 justify-center pt-2 mb-2 pl-10 hover:bg-gray-800">
                <div className="flex flex-row w-full">
                    <IoMdSearch className='text-white size-7 mt-2' />
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-gray-800 w-full hover:bg-gray-800 text-white  px-4 rounded-l-md focus:outline-none "
                    />
                </div>
                <hr className='mr-10'/>
            </div>
            <Link to='/' className="w-full h-10 justify-center pt-2 pl-10 hover:bg-gray-800" onClick={()=>handleMenu()}>
                <div className="text-white text-xl max-md:text-sm">Home</div>
            </Link>
            <Link to='/Movies' className="w-full h-10 justify-center pt-2 pl-10 hover:bg-gray-800" onClick={()=>handleMenu()}>
                <div className="text-white text-xl max-md:text-sm">Movies</div>
            </Link>
            <Link to='/Tv' className="w-full h-10 justify-center pt-2 pl-10 hover:bg-gray-800" onClick={()=>handleMenu()}>
                <div className="text-white text-xl max-md:text-sm">Tv Series</div>
            </Link>
            {/* <Link to='/Web' className="w-full h-10 justify-center pt-2 pl-10 hover:bg-gray-800" onClick={()=>handleMenu()}>
                <div className="text-white text-xl max-md:text-sm">Web Series</div>
            </Link> */}
            {userName ? (
                <div className="w-full h-10 justify-center pt-2 pl-10 hover:bg-gray-800">
                    <Link to='/BookMarks' className="text-white text-xl max-md:text-sm" onClick={()=>handleMenu()}>Book Marks</Link>
                </div>
            ) : (
                <div className="w-full h-10 justify-center pt-2 pl-10 hover:bg-gray-800 cursor-pointer"
                    onClick={()=> setshowModel(true)}
                >
                    <div to='/BookMarks' className="text-white text-xl max-md:text-sm">Book Marks</div>
                </div>                    
            )} 
            <div className="w-full h-10 justify-center pt-2 pl-10 hover:bg-gray-800">
                {userName? (
                        <div onClick={()=>{
                            Cookies.remove('userName')
                            Cookies.remove('token')
                            navigate('/')
                        }} className="text-white text-xl max-md:text-sm">SignOut</div>
                    ): (
                        <div onClick={()=>{
                            setshowModel(true)
                        }} className="text-white text-xl max-md:text-sm">Sign In</div>
                )}
            </div>           
        </div>
    </nav>
  );
};

export default Navbar;
