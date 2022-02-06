import React, {useContext, useEffect, useState} from 'react';
import CanvasJSReact from "./canvasjs.react";
import {currentCityContext, languageContext} from "../../../App";
import {addMinutes} from "../../../Functions/AddMinutes";

let CanvasJSChart = CanvasJSReact.CanvasJSChart;
let dps = []

function WaterChart(props){

    const currentCityId = useContext(currentCityContext)
    const langCtx = useContext(languageContext);

    const options = {
        title: {
            text: langCtx.language['rainHeading'][langCtx.lang]
        },
        theme: "dark1",
        axisY:{
            minimum: 0,
        },
        data: [{
            color: "#237ccd",
            type: "column",
            dataPoints: dps
        }]
    }

    const getLabel = () =>{
        let dataPoints = []
        if(props.minutely!==undefined){
            for (let i = 0; i < props.minutely.length; i++) {
                let date = new Date(props.minutely[i].dt * 1000);
                let label = `${date.getHours()}:${date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes()}`
                let precipitation = props.minutely[i].precipitation;
                let item = {label: label,  y: precipitation, x:i}
                dataPoints.push(item);
            }
        }else{
            //generowanie pustych data pointów
            let date = new Date();
            dataPoints.push({label: `${date.getHours()}:${date.getMinutes()}`,y:0, x:0})
            for (let i = 1; i < 60; i++) {
                date = addMinutes(date, 1);
                dataPoints.push({label: `${date.getHours()}:${date.getMinutes()}`, y:0, x:i})
            }
        }
        dps = dataPoints;
    }

    const [forceRefresh, setForceRefresh] = useState(false);

    useEffect(() => {
        setForceRefresh(false)
        getLabel();
        setForceRefresh(true)
    },[props])

    return (
        <div className={"fall"}>
            <div className="scrollWrapper">
                <div className={`chart ${currentCityId}`}>
                    {forceRefresh && <CanvasJSChart options = {options} className={currentCityId}/>}
                </div>
            </div>
            {props.warning && <div className={"warning"}>{langCtx.language['noRain'][langCtx.lang]}</div>}
        </div>
    );
}

export default React.memo(WaterChart);