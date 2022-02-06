import React,{useState, useEffect, useContext} from 'react';
import data from "../../../DataJSON/city.list.json";
import SearchMap from "./SearchMap";
import {keyGoogle} from "../../keyAPI";
import {useHistory} from "react-router-dom";
import {languageContext} from "../../../App";

function SearchResults(props){

    let langCtx = useContext(languageContext);

    //do not Ask.. I think I need one parameter
    //so I do not want react-router dependencies
    const [query, setQuery] = useState(decodeURI(window.location.href.slice(window.location.href.indexOf('?q=')+3)))
    const [options, setOptions] = useState([])

    useEffect(() => {
        setQuery(decodeURI(window.location.href.slice(window.location.href.indexOf('?q=')+3)))
    },[window])

    useEffect(() => {
        filter(query);
    },[])

    const filter = (value) => {
        let tempOptions = []
        data.filter(el => {
            if(el.name.toLowerCase().startsWith(value)){
                tempOptions.push({name: el.name, id: el.id, lon: el.coord.lon, lat: el.coord.lat})
            }
        })
        setOptions(tempOptions)
    }

    const [optionsToDisplay, setOptionsToDisplay] = useState([])
    useEffect(() => {

        if(options.length===1) {
            props.changeHandler(options[0].id, options[0].name)
            redirect()
        }
        setOptionsToDisplay(options.slice(0,100))
    },[options])


    const history = useHistory(); //hook for redirect to result page
    function redirect(){
        history.push('/currentWeather');
    }

    return (
        <div>
            {options.length===0 && <div className={"noResults"}>{langCtx.language['noResults'][langCtx.lang]}</div>}
            <SearchMap
                query = {query}
                changeHandler = {props.changeHandler}
                redirect = {redirect}
                markers = {optionsToDisplay.map(elem => (
                    {
                        id: elem.id,
                        name: elem.name,
                        lat: elem.lat,
                        lng: elem.lon
                    }
                ))}
                googleMapURL= {`https://maps.googleapis.com/maps/api/js?key=${keyGoogle}`}
                loadingElement={<div style={{ height: `500px` }} />}
                containerElement={<div/>}
                mapElement={<div style={{ height: `900px` }} />}
            />

        </div>
    )
}
export default SearchResults;