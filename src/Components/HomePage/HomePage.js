import React,{useContext} from 'react';
import '../../Styles/HomePage/HomePage.sass'
import {languageContext} from "../../App";

function HomePage(){

    const langCtx = useContext(languageContext)

    return(
        <div className={"homepage"}>
            <div className={"greet"}>
                <div className="container">
                    <h1>{langCtx.language['greet'][langCtx.lang]}</h1>
                    <div>{langCtx.language['greet2'][langCtx.lang]}</div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;