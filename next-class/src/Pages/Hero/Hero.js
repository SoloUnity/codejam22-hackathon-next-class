import "./Hero.css";
import { Link } from "react-router-dom";
import Logo from '../../assets/Logo.svg';
import React from 'react'

const Hero = () => {
  return (
    <div className="hero__back">
        <div className="hero__wrapper">
            <div className="hero__content">
                <div><img src={Logo} alt='reload page' className='logo1'></img></div>
                <h1 className="hero__title">Welcome to Next Class!</h1>
                <p className="hero__text">Next Class is a platform that allows you to sync school schedules with your friends. Our main goal is to cut on the time to plan. Next-Class is currently only for McGill students but in further updates other universities will have access.</p>
                <div className="hero__buttons">
                <Link className="button__link" to="/login"><button className="hero__button">Start Now</button></Link>
                </div>
            </div>   
        </div>
    </div>
  )
}

export default Hero