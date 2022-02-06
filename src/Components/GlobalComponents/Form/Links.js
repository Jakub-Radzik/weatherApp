import React,{useEffect, useContext} from 'react';
import {Link} from "react-router-dom";
import {languageContext} from "../../../App"

function Links() {


    //routing styles mechanisms====================================================================

    //styles for button routing
    //user will see different styles for site he actually is
    //TODO: musisz ogarnąć styl dla przycisku zależny od routingu

    const langCtx = useContext(languageContext)


    return(
        <React.Fragment>
            <Link to="/currentWeather" > {/*onClick={linkHandler}*/}
                <button>{langCtx.language['currentWeather'][langCtx.lang]}</button>
            </Link>

            <Link to="/minuteWeather">
                <button>{langCtx.language['rainWeather'][langCtx.lang]}</button>
            </Link>

            <Link to="/twoDaysWeather">
                <button>{langCtx.language['twoDaysWeather'][langCtx.lang]}</button>
            </Link>

            <Link to="/weekWeather">
                <button>{langCtx.language['weekForecast'][langCtx.lang]}</button>
            </Link>

            {/*<Link to="/version">*/}
            {/*    <button>{langCtx.language['aboutApp'][langCtx.lang]}</button>*/}
            {/*</Link>*/}
        </React.Fragment>
    )
}

export default Links;