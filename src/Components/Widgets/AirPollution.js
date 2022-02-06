import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {key} from "../keyAPI";
import "../../Styles/IndependentStyles/AirPollution.sass"
import {languageContext} from "../../App";

function AirPollution(props){

    const [data, setData] = useState({
        coord:[
            50,
            50
        ],
        list:[
            {
                dt:1605182400,
                main:{
                    aqi:1
                },
                components:{
                    "co":201,
                    "no":0,
                    "no2":0,
                    "o3":68,
                    "so2":0,
                    "pm2_5":0,
                    "pm10":0,
                    "nh3":0
                }
            }
        ]
    } );
    const [loading, setLoading] = useState(true)
    const timer = () => {setLoading(false);}
    const langCtx = useContext(languageContext)

    useEffect(() =>{
        axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${props.coords.lat}&lon=${props.coords.lon}&appid=${key}`)
            .then(response => {
                // console.log(response.data); //delete comment if U want to see data from response
                setData(response.data);
                setTimeout(timer,1000);
            })
            .catch(error => {
                console.log(error);
            })

        return () => {
            clearTimeout(timer)
        }

    },[props.coords])

    return(
        <div className={"airPollutionWidget"}>
            <div className={"left"}>
                <div>{langCtx.language['quality'][langCtx.lang]}</div>
                <div className={`quality q${data.list[0].main.aqi}`}>{langCtx.language['pollution'][data.list[0].main.aqi][langCtx.lang]}</div>
            </div>
            <div className={"right"}>
                <div>
                    <span>CO</span>
                    <span>{data.list[0].components.co} μg/m<sup>3</sup></span>
                </div>

                <div>
                    <span>NH<sub>3</sub></span>
                    <span>{data.list[0].components.nh3} μg/m<sup>3</sup></span>
                </div>

                <div>
                    <span>NO</span>
                    <span>{data.list[0].components.no} μg/m<sup>3</sup></span>
                </div>

                <div>
                    <span>NO<sub>2</sub></span>
                    <span>{data.list[0].components.no2} μg/m<sup>3</sup></span>
                </div>

                <div>
                    <span>O<sub>3</sub></span>
                    <span>{data.list[0].components.o3} μg/m<sup>3</sup></span>
                </div>

                <div>
                    <span>PM 2.5</span>
                    <span>{data.list[0].components.pm2_5} μg/m<sup>3</sup></span>
                </div>

                <div>
                    <span>PM 10</span>
                    <span>{data.list[0].components.pm10} μg/m<sup>3</sup></span>
                </div>

                <div>
                    <span>SO<sub>2</sub></span>
                    <span>{data.list[0].components.so2}μg/m<sup>3</sup></span>
                </div>
            </div>

        </div>
    )
}

export default React.memo(AirPollution);