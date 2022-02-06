import React,{useState,useContext,useEffect} from 'react';
import {currentCityContext, languageContext} from "../../App";
import axios from "axios";
import {key} from "../keyAPI";
import ReactLoading from "react-loading";
import DayComponent from "./WeekWeatherForOneLocation/DayComponent";
import "../../Styles/WeekWeather/Week.sass"

function WeekWeatherForOneLocation(props){
    const [data, setData] = useState({daily:[]});
    const [loading, setLoading] = useState(true)
    const currentCityId = useContext(currentCityContext)
    const langCtx = useContext(languageContext)
    const part = 'minutely,hourly,current'
    const timer = () => {setLoading(false);}

    const loadData = () => {
        setLoading(true);
    }

    useEffect(() => {
        loadData();
    },[currentCityId])

    useEffect(() =>{
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${props.coords.lat}&lon=${props.coords.lon}&lang=${langCtx.language['lang'][langCtx.lang]}&exclude=${part}&appid=${key}`)
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

    return(
        <div id={`map-${props.coords.lat}-${props.coords.lon}`}>
            {loading && <div className="boxLoader"><ReactLoading className="pageLoader" type="spinningBubbles" color="#4269f5" height={667} width={375} /></div>}
            {!loading &&
            <div className="scrollWrapperWeek">
                {
                    data.daily.map((el,idx) =>{
                        //every component has a name of week, so i need to generate them
                        let dayOfWeek = new Date().getDay();
                        if(dayOfWeek===0) {dayOfWeek = 7}
                        let forElem = (dayOfWeek+idx)>7?dayOfWeek+idx-7:dayOfWeek+idx;
                        return <DayComponent data={data.daily[idx]} key={idx} dayOfWeek={forElem}/>
                    })
                }
            </div>
            }
        </div>
    )
}

export default React.memo(WeekWeatherForOneLocation);