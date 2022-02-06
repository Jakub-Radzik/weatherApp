import React, {useEffect, useState} from 'react';
import $ from "jquery";
import SearchBar from "../Search/SearchBar";

function MobileMenu(props) {

    const [isMenuOnDisplay, setMenuOnDisplay] = useState(false);

    const toggleHandler = () => {
        $(".menu").slideToggle(300);
        setMenuOnDisplay(!isMenuOnDisplay)
    }

    useEffect(() => {

        const scrollHideHandler = () => {
            $(".menu").slideUp(300);
            setMenuOnDisplay(false);
            window.removeEventListener('scroll', scrollHideHandler);
        }

        window.addEventListener('scroll', scrollHideHandler);
    },[isMenuOnDisplay])


    return(
        <form>
            <SearchBar/>
            <div className={'cityNameMobile'}>{props.city}</div>
            <div className="toggle" onClick={toggleHandler}> MENU </div>
        </form>
    )
}

export default React.memo(MobileMenu);