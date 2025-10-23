import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet"; //title of website
import Config from "../Config.json";

const TITLE = Config.SITE_TITLE + " | Records For Sale";
const DESC = "Take a look at this months exclusive offerings.";


class Shop extends React.Component{
    render(){
        return(
             <main>
                <Helmet>
                <title> {TITLE} </title>
                <meta name = "description" content={DESC}/>
                </Helmet>
                <h1 className="page-title">Our Collection</h1>
                <section id="product-grid" className="product-grid" aria-live="polite">
                </section>
             </main>);
        }
}

export default Shop;