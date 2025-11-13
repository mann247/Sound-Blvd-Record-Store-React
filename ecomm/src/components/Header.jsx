import React from "react";
import {NavLink, Link} from "react-router-dom";

class Header extends React.Component{
    render(){
        return (
            <header>
                <div>
                    <nav>
                        <NavLink to= "/">Home</NavLink>
                        <NavLink to="/Shop">Shop</NavLink>
                        <NavLink to="/Contact">Contact Us</NavLink>
                    </nav>
                </div>
            </header>
        );
    }

}
 
export default Header;