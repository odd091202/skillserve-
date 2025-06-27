import React from "react";
import './Home.css';
import heroImage from "../assets/hero.jpg";

const Home =()=>(
  <div className="page-content">
    <img src ={heroImage} alt="skillserve Banner" className="home-banner"/>
    <h2>welcome to skillserve</h2>
    <p className="intro-text">Connecting skilled professionals like drivers, plumbers, electricians and doctors to employers in need.</p>
  </div>
  );

export default Home;