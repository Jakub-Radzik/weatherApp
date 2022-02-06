import React from 'react';
import Links from "./Links";
import SearchBar from "../Search/SearchBar";
import '../../../Styles/HomePage/temp.sass'

function Menu(props) {
    return(
        <form>
            <Links/>
            <SearchBar/>
            <div className={'cityName'}>{props.city}</div>
        </form>
    )
}

export default React.memo(Menu);