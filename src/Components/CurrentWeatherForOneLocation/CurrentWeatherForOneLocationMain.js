import React, {useContext, useState, useEffect} from 'react';
import {key, keyGoogle} from "../keyAPI";
import axios from "axios";
import {TimestampToDate} from "../../Functions/TimestampToDate";
import {CoordinatesFormat} from '../../Functions/CoordinatesFormat';
import ReactLoading from 'react-loading';
import "../../Styles/CurrentWeatherForOneLocation/Current.sass"
import arrow from "../../Images/arrow.png"
import sunrise from "../../Images/sunrise.png"
import sunset from "../../Images/sunset.png"
import {currentCityContext, languageContext} from "../../App";
import NewMap from "./CurrentWeatherForOneLocationComponents/NewMap";

function CurrentWeatherForOneLocationMain(){

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const currentCityId = useContext(currentCityContext)

    const [data, setData] = useState({
        name: 'City',
        dt : 0,
        coord :{
            lon: 0,
            lat: 0
        },
        sys: {
            country: 'World',
            sunrise:0,
            sunset:0
        },
        weather: [{
            main : "Clear",
            description: "clear sky",
            icon: "01d"
        }],
        wind : {
            speed: 1,
            deg: 0
        },
        clouds:{
            all:1
        },
        main : {
            temp : 0,
            feels_like : 0,
            temp_min : 0,
            temp_max : 0,
            pressure : 0,
        },
    });

    const timer = () => {setLoading(false);setError(false);}
    const langCtx = useContext(languageContext);


    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${currentCityId}&lang=${langCtx.language['lang'][langCtx.lang]}&appid=${key}`)
            .then(response => {
                setLoading(true);
                setData(response.data)
                // console.log(response.data)
                //convert Kelvins to Celcius
                setData(prevState=>({
                    ...prevState,
                    main:{
                        temp : Math.floor(prevState.main.temp-273),
                        feels_like : Math.floor(prevState.main.feels_like-273),
                        temp_min : Math.floor(prevState.main.temp_min-273),
                        temp_max : Math.floor(prevState.main.temp_max-273),
                    }
                }))
                setTimeout(timer,1000);
            })
            .catch(err =>{
                console.log(err)
                setError(true);
                setLoading(false);
            })

            return () => {
                clearTimeout(timer)
            }

    },[currentCityId, langCtx])

    return(
        <React.Fragment>
            {loading && <div className="boxLoader"><ReactLoading className="pageLoader" type="spinningBubbles" color="#4269f5" height={667} width={375} /></div>}
            {!loading && <div className="current">

                <div className="left">
                    <NewMap
                        lat={data.coord.lat}
                        lon={data.coord.lon}
                        googleMapURL= {`https://maps.googleapis.com/maps/api/js?key=${keyGoogle}`}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div/>}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                    <div className="place">
                        <h1>{data.sys.country}</h1>
                        <div>{data.name}</div>
                    </div>
                    <div className="coord">
                        <div>{CoordinatesFormat(data.coord.lat, "N")}</div>
                        <div>{CoordinatesFormat(data.coord.lon, "E")}</div>
                    </div>
                </div>

                <div className="right">
                    <div className="sys">
                        <div>
                            <img src={sunrise} alt="sunrise-icon"/>
                            {TimestampToDate(data.sys.sunrise)}
                        </div>
                        <div>
                            <img src={sunset} alt="sunset-icon"/>
                            {TimestampToDate(data.sys.sunset)}
                        </div>
                    </div>

                    <div className="weather">
                        <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}/>
                        <div key={data.weather[0].description.id}>{data.weather[0].description}</div>
                    </div>

                    <div className="windClouds">
                        <div>
                            <p>{langCtx.language['wind'][langCtx.lang]}</p>
                            <p>{data.wind.speed} m/s <img id="windArrow" src={arrow} alt="arrow-wind" style={{transform: `rotate(${data.wind.deg}deg)`}}/></p>
                        </div>

                        <div>
                            <p>{langCtx.language['cloudy'][langCtx.lang]}</p>
                            <p>{data.clouds.all} %</p>
                        </div>
                    </div>

                    <div className="main">
                        <div>
                            <p>{langCtx.language['temperature'][langCtx.lang]}</p>
                            <p>{data.main.temp}°C</p>
                        </div>
                        <div>
                            <p>{langCtx.language['feels_like'][langCtx.lang]}</p>
                            <p>{data.main.feels_like}°C</p>
                        </div>
                        <div>
                            <p>{langCtx.language['temp_max'][langCtx.lang]}</p>
                            <p>{data.main.temp_max}°C</p>
                        </div>
                        <div>
                            <p>{langCtx.language['temp_min'][langCtx.lang]}</p>
                            <p>{data.main.temp_min}°C</p>
                        </div>
                    </div>

                    <div className="dt">{langCtx.language['time_measurement'][langCtx.lang]} {TimestampToDate(data.dt)}</div>
                </div>

            </div>}
        </React.Fragment>

    )
}

export default React.memo(CurrentWeatherForOneLocationMain);


