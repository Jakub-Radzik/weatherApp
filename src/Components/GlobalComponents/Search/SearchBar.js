import React, {useState} from 'react';
import loupe from '../../../Images/loupe.png'
import { useHistory } from "react-router-dom";

function SearchBar(){

    const [searchValue, setSearchValue] = useState("")
    const history = useHistory(); //hook for redirect to result page

    //handler for searchBar - react is strange
    const searchHandler = e => {
        setSearchValue(e.target.value)
    }

    //we have query and we go to page where we have more cities
    //example:
    //In polish we have four cities Leszno
    //so we need to decide which one we want to see
    //or we have one Wrocław so we dont need that and load Wrocław
    //we can do it on one site below
    const isSearchEmpty = () => {
        return searchValue.length===0;
    }

    const submitHandler = e => {
        if(!isSearchEmpty()){
            setSearchValue("")
            history.push('/find?q='+searchValue.toLowerCase())
            window.location.reload(true)
        }
    }

    const enterHandler = e =>{
        if(e.keyCode === 13 && !isSearchEmpty()) {
            history.push('/find?q='+searchValue.toLowerCase())
            window.location.reload(true) //handler must be onKeyUp or dont work :(
        }
    }


    return(
        <div className={"searchEngine"}>
            <form onKeyUp={enterHandler} > {/*OnKeyDown not work idk why*/}
                <input type="text" placeholder="Search.." className="search" value={searchValue} onChange={searchHandler}/>
                <div type={"submit"} id={"submit-search"} onClick={submitHandler}>
                    <img src={loupe} alt="Loupe"/>
                </div>
            </form>
        </div>
    )
}

export default SearchBar;