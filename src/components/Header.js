import React, { useState, useEffect } from 'react'
import  { withRouter, Link } from "react-router-dom";
import Hamb from "./Hamb";
import { ReactComponent as HomeIcon } from "../Assets/home.svg";
import { ReactComponent as MenuAnimatedIcon } from '../Assets/menu.svg';
import '../Assets/MenuIcon.css';

const Header = ({ history }) => {

    const [initial, setInitial] = useState(false);
    const [clicked, setClicked] = useState(null);
    const [disabled, setDisabled] = useState(false);
    
    // Use Effect
    useEffect(() => {
        //Listening for page changes to close menu when you navigate to another page
        history.listen(() => { setClicked(false) });
    }, [history]);
    
    // Toggle menu
    const handleMenu = () => {
        disableMenu();
        if (initial === false) {
            setInitial(null);
            setClicked(true);
        } else if (clicked !== null) setClicked(!clicked);
    };
    
    const disableMenu = () => {
        setDisabled(!disabled);
        setTimeout(() => {
            setDisabled(false);
        }, 900);
    };
 
    return (
        <header className="Header">
                <div className="inner-header">
                    <div className="logo">
                        <Link to="/">
                            <HomeIcon />
                        </Link>
                    </div>
                    {/* <h3>My Portfolio</h3> */}
                    <div onClick={handleMenu} style={{pointerEvents: disabled ? "none" : "initial"}}>
                        <MenuAnimatedIcon className={ clicked ? 'active' : '' } />
                    </div>
                </div>
            <Hamb initial={initial} clicked={clicked} />
        </header>
    );
};

export default withRouter(Header);