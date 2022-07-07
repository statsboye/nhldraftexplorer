import React, {Component, useState } from 'react';
import FlashlightOnIcon from '@mui/icons-material/FlashlightOn';
import FlashlightOffIcon from '@mui/icons-material/FlashlightOff';

const Header = (props) => {
    const theme = props.theme
    const toggleTheme = props.toggleTheme
    return (
        <div className='header' aria-label='Header'>
            <div className='holder'>
            <div className='draft-logo'>NHL Draft Explorer</div>
            <div className='lightbulb' aria-label='Light Mode Toggle' onClick={toggleTheme}>{theme === "dark" ? <FlashlightOnIcon style={{ color: "#FFF", fontSize: "3em" }} /> : <FlashlightOffIcon style={{ color: "#000", fontSize: "3em" }} />}</div>
        
            </div>
            </div>
        
        );
}

export default Header;
