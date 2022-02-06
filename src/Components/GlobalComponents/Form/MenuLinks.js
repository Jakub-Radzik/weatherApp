import React,{useContext} from 'react';
import {Link} from "react-router-dom";
import {languageContext} from "../../../App";

function MenuLinks() {

    const langCtx = useContext(languageContext)

    return(
        <div className="menu">
            <Link to="/currentWeather">
                <div className="menu-item">{langCtx.language['currentWeather'][langCtx.lang]}</div>
            </Link>

            <Link to="/minuteWeather">
                <div className="menu-item">{langCtx.language['rainWeather'][langCtx.lang]}</div>
            </Link>

            <Link to="/twoDaysWeather">
                <div className="menu-item">{langCtx.language['twoDaysWeather'][langCtx.lang]}</div>
            </Link>

            <Link to="/weekWeather">
                <div className="menu-item">{langCtx.language['weekForecast'][langCtx.lang]}</div>
            </Link>

            {/*<Link to="/version">*/}
            {/*    <div className="menu-item">{langCtx.language['aboutApp'][langCtx.lang]}</div>*/}
            {/*</Link>*/}
        </div>
    )
}

export default MenuLinks;