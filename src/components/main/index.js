import React, {Component, useState } from 'react';
import Header from '../ui/layout/Header';
import '../ui/css/style.css';
import useDarkMode from '../ui/layout/LightMode';
import DC from '../data/dataContainer';
const Main = () => {
    const {theme, toggleTheme} = useDarkMode();
    document.body.classList.add(theme);

    return (
        <div className={'application ' +  theme}>
        <Header theme={theme} toggleTheme={toggleTheme}/>
        <div className='container'>
        <DC theme={theme} toggleTheme={toggleTheme}/>
        </div>
        </div>
        );
}

export default Main;
