// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './camponants/AppBar';
import Home from './camponants/home/Home';
import Movies from './camponants/movies/Movies';
import BookMarks from './camponants/movies/BookMarks';
import Index from './admin';
import AddNew from './admin/AddNew';
import Tv from './camponants/TV/Tv';
import Footer from './camponants/Footer';
import ReviewPage from './camponants/ReviewPage';
import Kannada from './camponants/home/Kannada';
// import Tv from './redux/tv';

function App() {
  return (
    <div className='h-screen text-white'>
      {/* <h1 className='text-2xl font-extrabold float-riogth'>Hello dear</h1> */}

      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Movies' element={<Movies type='movie' />} />
        <Route path='/Tv' element={<Tv type='tv' />} />
        {/* <Route path='/Web' element={<Tv type='tv' />} /> */}
        <Route path='/BookMarks' element={<BookMarks />} />
        <Route path='/admin' element={<Index />} />
        
        <Route path='/AddNew' element={<AddNew />} />
      </Routes>
      
      <Footer />
      {/* <ReviewPage /> */}
      
    </div>
  );
}

export default App;
