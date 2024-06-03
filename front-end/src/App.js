import './App.css';
import Navbar from './components/Navbar';
import { Routes,Route } from 'react-router-dom';
import Home from './pages/home';
import AddProduct from './pages/addProduct';
import AllProducts from './pages/allProducts';

function App() {
  localStorage.setItem("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjVjNTBkOWMyNWIxZmMzZTM3NTZhZTkiLCJpYXQiOjE3MTczOTM0MzEsImV4cCI6MTcxNzk5ODIzMX0.EV1qkCQ1jAwvNj1jF1hgjtPPp4ZA09MyGIyYEASSbrQ")
  return (
    <div className="App">
      <Navbar/>
      <Routes>
    <Route path='/' element={<Home/>}/>
      <Route path='/allProducts' element={<AllProducts/>}/>
      
      <Route path='/addProduct' element={<AddProduct/>}/>
      


    </Routes>
    </div>
  );
}

export default App;
