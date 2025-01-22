import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import HomePage from './Pages/HomePage/HomePage';
import TaskList from './Pages/TaskList/TaskList';
import AddTask from './Pages/AddTask/AddTask';
import Footer from './Pages/Footer/Footer';
import NavBar from './Pages/NavBar/NavBar';



function App() {
  return (
    <div className="App">
   <NavBar/>
 
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/TaskList" element={<TaskList/>} />
        <Route path="/AddTask" element={<AddTask/>}/>
        </Routes>
      </BrowserRouter>
  
    <Footer/>
    </div>
  );
}

export default App;
