import React,{useContext, useEffect} from 'react';
import {TimestampToDate} from "../../../Functions/TimestampToDate";
import {languageContext} from "../../../App";
import sunrise from "../../../Images/sunrise.png"
import sunset from "../../../Images/sunset.png"
import wind from "../../../Images/wind.png"
import arrow from "../../../Images/arrow.png";
import cloud from "../../../Images/cloud.png";
import pressure from "../../../Images/atmospheric.png";

function DayComponent(props){

    const langCtx = useContext(languageContext);

    return(
        <div className={"dayComponent"}>

                <div className="group">
                    <h2>{langCtx.language['weekDay'][props.dayOfWeek][langCtx.lang]}</h2>
                    <img src={`http://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`} alt={"icon"}/>
                    <h3>{props.data.weather[0].description}</h3>
                </div>

                <div className="group">
                    <div><img src={sunrise} alt="sunrise"/> {TimestampToDate(props.data.sunrise).slice(0,5)}</div>
                    <div><img src={sunset} alt="sunset"/> {TimestampToDate(props.data.sunset).slice(0,5)}</div>
                    <div><img src={wind} alt="wind"/> <span id={"arrowSpan"}>{props.data.wind_speed}m/s <img id="windArrow" src={arrow} alt="arrow-wind" style={{transform: `rotate(${props.data.wind_deg}deg)`}}/></span></div>
                    <div><img src={cloud} alt="cloud"/> {props.data.clouds}%</div>
                    <div><img src={pressure} alt="pressure"/> {props.data.pressure}hPa</div>
                </div>


                <div className="group">
                    <h2>{langCtx.language['temperature'][langCtx.lang]}</h2>
                    <div><span>{langCtx.language['morning'][langCtx.lang]}</span> <span>{Math.round(props.data.temp.morn-273)}°C</span></div>
                    <div><span>{langCtx.language['day'][langCtx.lang]}</span> <span>{Math.round(props.data.temp.day-273)}°C</span></div>
                    <div><span>{langCtx.language['evening'][langCtx.lang]}</span> <span>{Math.round(props.data.temp.eve-273)}°C</span></div>
                    <div><span>{langCtx.language['night'][langCtx.lang]}</span>  <span>{Math.round(props.data.temp.night-273)}°C</span></div>
                </div>

                <div className="group">
                    <h2>{langCtx.language['feels_like'][langCtx.lang]}</h2>
                    <div><span>{langCtx.language['morning'][langCtx.lang]}</span> <span>{Math.round(props.data.feels_like.morn-273)}°C</span></div>
                    <div><span>{langCtx.language['day'][langCtx.lang]}</span> <span>{Math.round(props.data.feels_like.day-273)}°C</span></div>
                    <div><span>{langCtx.language['evening'][langCtx.lang]}</span> <span>{Math.round(props.data.feels_like.eve-273)}°C</span></div>
                    <div><span>{langCtx.language['night'][langCtx.lang]}</span>  <span>{Math.round(props.data.feels_like.night-273)}°C</span></div>
                </div>
        </div>
    )

}

export default React.memo(DayComponent);