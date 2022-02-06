import React,{useContext} from 'react';
import {languageContext} from "../../App";
import ukraine from "../../Images/Flags/ukraine.png"
import russia from "../../Images/Flags/russia.png"
import france from "../../Images/Flags/france.png"
import uk from "../../Images/Flags/united-kingdom.png"
import china from "../../Images/Flags/china.png"
import germany from "../../Images/Flags/germany.png"
import SocialMedia from "./Footer/SocialMedia"

function Footer(){

    const langCtx = useContext(languageContext);

    return(
        <footer>
            <div className="responsive">
                <div>
                    <h1>{langCtx.language['contact'][langCtx.lang]}</h1>
                    <h3>Jakub Radzik</h3>
                    <h3>jradzik4@gmail.com</h3>
                    <SocialMedia/>
                </div>
                <div>
                    <h1>{langCtx.language['measurementsProvider'][langCtx.lang]}</h1>
                    <h2>open weathermap.org</h2>
                    <h1>{langCtx.language['mapProvider'][langCtx.lang]}</h1>
                    <h2>google.com</h2>
                </div>
                <div>
                    <h1>{langCtx.language['icons'][langCtx.lang]}</h1>
                    <div style={{width: '100%', display: 'inline'}}>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

                    <h1>{langCtx.language['translate'][langCtx.lang]}</h1>
                    <h2 className={"translator"}><span>Jakub Górecki</span> <span><img src={uk} alt="UK"/><img src={france} alt="FR"/></span></h2>
                    <h2 className={"translator"}><span>Rafał Kruszyna</span> <span><img src={china} alt="CH"/> <img src={germany} alt="DE"/></span></h2>
                    <h2 className={"translator"}><span>Nataliia Martynenko</span><span><img src={ukraine} alt="UK"/> <img src={russia} alt="RU"/></span></h2>
                </div>
            </div>
        </footer>
    )
}

export default Footer;