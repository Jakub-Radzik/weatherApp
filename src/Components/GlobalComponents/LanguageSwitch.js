import React,{useContext} from 'react';
import poland from '../../Images/Flags/poland.png'
import uk from '../../Images/Flags/united-kingdom.png'
import russia from '../../Images/Flags/russia.png'
import france from '../../Images/Flags/france.png'
import china from '../../Images/Flags/china.png'
import ukraine from '../../Images/Flags/ukraine.png'
import germany from '../../Images/Flags/germany.png'
import {languageContext} from "../../App";

function LanguageSwitch(){

    const langCtx = useContext(languageContext);

    return(
        <div className="langSwitch">
            <img src={poland} alt="PL" onClick={()=>{langCtx.setLang('pl')}}/>
            <img src={uk} alt="UK" onClick={()=>{langCtx.setLang('en')}}/>
            <img src={france} alt="FR" onClick={()=>{langCtx.setLang('fr')}}/>
            <img src={germany} alt="DE" onClick={()=>{langCtx.setLang('de')}}/>
            <img src={russia} alt="RU" onClick={()=>{langCtx.setLang('ru')}}/>
            <img src={ukraine} alt="UA" onClick={()=>{langCtx.setLang('ua')}}/>
            <img src={china} alt="CU" onClick={()=>{langCtx.setLang('cn')}}/>
        </div>
    )
}

export default LanguageSwitch;