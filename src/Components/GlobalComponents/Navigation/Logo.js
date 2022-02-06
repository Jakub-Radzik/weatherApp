import React from 'react';
import logoIcon from '../../../Images/cloudy.png';

function Logo() {
    return(
        <div className="logo">
            <img src={logoIcon} alt="icon-logo"/>
            <h1>radzik.weather</h1>
        </div>
    )
}

export default Logo;