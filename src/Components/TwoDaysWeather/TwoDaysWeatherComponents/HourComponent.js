import React from 'react';
import arrow from "../../../Images/arrow.png";
import cloud from "../../../Images/cloud.png";
import pressure from "../../../Images/atmospheric.png";
import wind from "../../../Images/wind.png";
import thermometer from "../../../Images/thermometer.png";
import {TimestampToDate} from "../../../Functions/TimestampToDate";
import ReactTooltip from "react-tooltip";

function HourComponent(props){

    return(
        <div className={`hour h${TimestampToDate(props.data.dt).slice(0,2)}`}>
            <div className="weather">
                <img src={`http://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`}/>
                <div>{props.data.weather[0].description}</div>
            </div>

            <div className={"wind"}>
                <img src={wind} alt="wind"/>
                <p>
                    {props.data.wind_speed} m/s
                    <img id="windArrow" src={arrow} alt="arrow-wind" style={{transform: `rotate(${props.data.wind_deg}deg)`}}/>
                </p>
            </div>

            <div className={"clouds"}>
                <img src={cloud} alt="cloud"/>
                <p>{props.data.clouds} %</p>
            </div>

            <div className="pressure">
                <img src={pressure} alt="pressure"/>
                <p>{props.data.pressure} hPa</p>
            </div>

            <div className="temp" data-tip="Temperatura / Odczuwalna">
                <ReactTooltip place={"top"} />
                <img src={thermometer} alt="temp"/>
                <p>{Math.round(props.data.temp-273)}°C<br/>{Math.round(props.data.feels_like-273)}°C</p>
            </div>

            <div className="dt">
                {TimestampToDate(props.data.dt).slice(0,5)} {/*slice because function return HH:MM:SS and i need HH:MM*/}
            </div>



        </div>
    )
}

export default React.memo(HourComponent);