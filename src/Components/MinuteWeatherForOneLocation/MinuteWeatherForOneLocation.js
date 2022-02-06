import React, {useContext, useEffect, useState} from 'react';
import {currentCityContext, languageContext} from "../../App";
import {key} from "../keyAPI";
import axios from "axios";
import ReactLoading from 'react-loading';

import WaterChart from "./MinuteWeatherForOneLocationComponents/WaterChart";
import '../../Styles/MinuteWeatherForOneLocation/Chart.sass'

function MinuteWeatherForOneLocation(props){

    const [data, setData] = useState();
    const [loading, setLoading] = useState(true)
    const currentCityId = useContext(currentCityContext)
    const langCtx = useContext(languageContext)
    const exclude = 'daily,hourly,daily,current'

    const timer = () => {setLoading(false);}

    useEffect(() => {
        setLoading(true);
    },[currentCityId])

    useEffect(() =>{
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${props.coords.lat}&lon=${props.coords.lon}&lang=${langCtx.language['lang'][langCtx.lang]}&exclude=${exclude}&appid=${key}`)
            .then(response => {
                setData(response.data);
                setTimeout(timer,1000);
            })
            .catch(error => {
                console.log(error);
            })

        return () => {
            clearTimeout(timer)
        }
    },[props.coords, langCtx])

    //INFORMATION ABOUT RAIN====================================================================================
    //function to check is any elem in array >0;
    function isOverZero(element, index, array) {
        return element > 0;
    }

    //state
    const [warning, setWarning] = useState(false);

    //set no rain if all precipations are 0
    const analyzeDataPoints = () => {
        let precipitationArray = data.minutely.map(element => element.precipitation);
        if(precipitationArray.some(isOverZero)){setWarning(false);}
        else{setWarning(true);}
    }

    useEffect(() => {
        if(data) analyzeDataPoints();
    },[data])
    //INFORMATION ABOUT RAIN END================================================================================

    return(
        <div id={`map-${props.coords.lat}-${props.coords.lon}`}>
            {loading && <div className="boxLoader"><ReactLoading className="pageLoader" type="spinningBubbles" color="#4269f5" height={667} width={375} /></div>}
            {!loading && <WaterChart minutely={data.minutely} warning={warning}/>}
        </div>
    )
}

export default React.memo(MinuteWeatherForOneLocation);