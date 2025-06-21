import React from "react";
import{BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard'
import JobList from './pages/JobList';
import JobForm from './pages/JobForm';
import './App.css';

function App(){
    return(
        <Router>
            <div className="app-wrapper">
            <Navbar />
            <div className="container">

            <Routes>

                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/jobs" element={<JobList/>}/>
                <Route path="/jobs/create" element={<JobForm/>}/>
            </Routes>
            </div>
            </div>
        </Router>
    );
}

export default App;