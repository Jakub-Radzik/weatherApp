import React, {useEffect, useState} from 'react';
import Logo from "./Navigation/Logo";
import Menu from "./Form/Menu";
import MobileMenu from "./Form/MobileMenu";
import MenuLinks from "./Form/MenuLinks";
import {Link} from "react-router-dom";

function Navigation(props){


    //Resize okna, aby dynamicznie zmieniać stylowanie na mobilne
    //UseEffect na każdy resize zmienia informacje o tym czy okno jest mniejsze/ większe niż 1024px

    const mobileString = "(max-width: 1024px)";
    const [isMobile, setIsMobile] = useState({ mobile: window.matchMedia(mobileString).matches });

    useEffect(() => {
        const handler = () => {
            setIsMobile({mobile: window.matchMedia(mobileString).matches});
            // console.log("resize",isMobile);
        };

        const mouseHandler= () =>{
            setIsMobile({mobile: window.matchMedia(mobileString).matches});
            window.removeEventListener('mousemove', mouseHandler);
        }
        window.addEventListener('resize', handler);
        window.addEventListener('mousemove', mouseHandler);

        return () => {
            window.removeEventListener('resize', handler);

        }
    },[])

    return (
        <React.Fragment>
            {!isMobile.mobile && <nav className="desktop">
                <div className="responsive">
                    <Link to="/">
                        <Logo/>
                    </Link>
                    <Menu currentSelectedId={props.currentSelectedId} changeHandler={props.changeHandler} city={props.city}/>
                </div>
            </nav>}

            {isMobile.mobile && <React.Fragment>
                <nav className="mobile">
                    <Link to="/">
                        <Logo/>
                    </Link>
                    <MobileMenu currentSelectedId={props.currentSelectedId} changeHandler={props.changeHandler} city={props.city}/>
                </nav>
                <MenuLinks/>
            </React.Fragment>
            }
        </React.Fragment>
    )

}

export default Navigation;