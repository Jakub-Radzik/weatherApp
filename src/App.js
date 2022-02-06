// import './App.css';
import CurrentWeatherForOneLocationMain
    from "./Components/CurrentWeatherForOneLocation/CurrentWeatherForOneLocationMain";
import React, {useEffect, useState} from 'react';
import './Styles/Style.sass'

import {Route, Switch} from "react-router-dom";
import MinuteWeatherForOneLocation from "./Components/MinuteWeatherForOneLocation/MinuteWeatherForOneLocation";
import Footer from "./Components/GlobalComponents/Footer";
import Navigation from "./Components/GlobalComponents/Navigation";
import HomePage from "./Components/HomePage/HomePage";
import TwoDaysWeather from "./Components/TwoDaysWeather/TwoDaysWeather";
import dataJSON from "./DataJSON/city.list.json";
import LanguageSwitch from "./Components/GlobalComponents/LanguageSwitch";
import WeekWeatherForOneLocation from "./Components/WeekWeatherForOneLocation/WeekWeatherForOneLocation";
import {language} from "./Dictionary";
import SearchResults from "./Components/GlobalComponents/Search/SearchResults";
import AirPollution from "./Components/Widgets/AirPollution";
import Version from "./Components/GlobalComponents/Version";

export const currentCityContext = React.createContext(6695624);
export const languageContext = React.createContext({language:language, lang:'pl', setLang:()=>{}});

function App() {

    const [lang, setLang] = useState('pl');

    const [currentSelectedId, setCurrentSelectedId] = useState(6695624); //WWA
    const [currentSelectedName, setCurrentSelectedName] = useState("Warszawa");
    const [coords, setCoords] = useState({lon: 21.04191, lat: 52.23547})

    const changeHandler = (e) =>{
        setCurrentSelectedId(e.target.value);
    }

    function changeHandlerIdName(id, name, lon, lat){
        setCurrentSelectedId(id);
        setCurrentSelectedName(name);
        setCoords({lon:lon, lat:lat});
    }

    //remember city after refresh ==========================================================================
    //remember language after refresh ============================================
    //I prefer to store short id as number but localStorage prefer string, so i will not argue with him :(
    //read id on refresh
    useEffect(() => {
        let selectedOption = localStorage.getItem( 'cityId' )
        let selectedLanguage = localStorage.getItem( 'lang' )
        let selectedName =  localStorage.getItem( 'name' )
        let selectedLon =  localStorage.getItem( 'lon' )
        let selectedLat =  localStorage.getItem( 'lat' )

        if(selectedLanguage){
            setLang(selectedLanguage) //take id from storage and use
        }else{
            localStorage.setItem( 'lang', `en`) //English as default
        }

        if(selectedOption){
            setCurrentSelectedId(parseInt(selectedOption)) //take id from storage and use
        }else{
            localStorage.setItem( 'cityId', `6695624`) //WWA as default on first visit
        }

        if(selectedName){
            setCurrentSelectedName(selectedName) //take id from storage and use
        }else{
            localStorage.setItem( 'name', `Warszawa`) //WWA as default on first visit
        }

        if(selectedLon){
            setCoords({...coords, lon: 21.04191})
        }else{
            localStorage.setItem( 'lon', `21.04191`)
        }

        if(selectedLat){
            setCoords({...coords, lat: 52.23547})
        }else{
            localStorage.setItem( 'lat', `52.23547`)
        }

        // console.log(coords)
    },[])

    //change id in localStorage when id change on site
    useEffect(() => {
        localStorage.setItem( 'cityId', `${currentSelectedId}`)
        localStorage.setItem( 'lang', `${lang}`)
        localStorage.setItem( 'name', `${currentSelectedName}`)
        localStorage.setItem( 'lon', `${coords.lon}`)
        localStorage.setItem( 'lat', `${coords.lat}`)
    },[currentSelectedId, lang, currentSelectedName, coords])

    //end of remembering id section =========================================================================

    return (
        <div className={`App`}>
        <languageContext.Provider value={{language:language, lang:lang, setLang: (value)=>{setLang(value)}}}>
                <currentCityContext.Provider value={currentSelectedId}>

                    <Navigation currentSelectedId={currentSelectedId} changeHandler={changeHandler} city={currentSelectedName}/>
                    <LanguageSwitch/>

                    <Switch>
                        <Route exact path='/' component={HomePage}/>

                        <Route path='/currentWeather'>
                            <CurrentWeatherForOneLocationMain coords={coords}/>
                            <AirPollution coords={coords}/>
                        </Route>

                        <Route path='/minuteWeather'>
                            <MinuteWeatherForOneLocation coords={coords}/>
                        </Route>
                        <Route path='/twoDaysWeather'>
                            <TwoDaysWeather coords={coords}/>
                        </Route>
                        <Route path='/weekWeather'>
                            <WeekWeatherForOneLocation coords={coords}/>
                        </Route>
                        <Route path='/find'>
                            <SearchResults changeHandler={changeHandlerIdName} />
                        </Route>
                        {/*<Route path='/sandbox'>*/}
                        {/*    <SandBox coords={coords}/>*/}
                        {/*</Route>*/}
                    </Switch>

                    <Version/>
                    <Footer/>
                </currentCityContext.Provider>
        </languageContext.Provider>
    </div>

  );
}

export default App;
