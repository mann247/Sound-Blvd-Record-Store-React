import React from "react";
import { Link } from "react-router-dom";
import {Helmet} from "react-helmet";
import Config from "../Config.json";
import ss from '../images/s&s.jpg';
import Slider from '../components/Slider.jsx';

const TITLE = Config.SITE_TITLE + " | Home";
const DESC = "Welcome to Sound Blvd. Records!";

class Home extends React.Component{
    
    render(){
         const slides = [
            { src: 'https://image.okayplayer.com/1414799.webp?imageId=1414799&width=960&height=548&format=jpg', alt: 'DAngelo Homage Poster', caption: 'Rest in Peace to Michael Eugene Archer (a.k.a: D-Angelo). Join us on October 17th to celebrate his legacy @ 7PM EST.'},
            { src: ss, alt: 'Listening Room S&S records', caption: "It's that time again! Visit us on November 7th, 2025  for our upcoming Listening Room: Sounds & Stories" },
            { src: 'https://djlifemag.com/wp-content/uploads/2025/05/Zack-Fox-01-1536x864.jpeg', alt: 'Zack Fox DJing', caption: 'Interested in becoming a DJ? Join us for our mixing class, hosted by Zack Fox on November 21st, 2025' }
        ]

        return (
        <main>
            <Helmet>
                <title> {TITLE} </title>
                <meta name = "description" content={DESC}/>
            </Helmet>
        {/* <!-- Hero Image--> */}
        {/* change to className */}
        <section className="hero"> 
            <img className="hero-img" src={require('/Users/nmanningrth/Desktop/ecommerce v2.1/soundblvd/src/images/hero-store.jpg')} alt="Sound Blvd. Records interior" loading="eager" decoding="async"/>
            <div className="hero-text">
                <h2>Welcome to the Sound!🎧🎶</h2>
                <p>Your one stop shop for everything Neo-Soul!</p>
                <Link to="/Shop" className="btn">Browse Records</Link>
            </div>
        </section>

        
         {/* <!-- About section--> */}
          <section className="about" aria-label="about-heading">
            <div className="about-text">
                <h2 id="about-us"> About Us</h2>
                <p>
                   What's Your Sound? What's Your Story? Find it here at Sound Blvd. Records!!
                </p>

                <p>
                    <strong> Sound Blvd. Records</strong> is a black & woman-owned record store, located in Charlotte, NC.
                    At Sound Blvd. Records, we believe vinyl isn't just music - it's an experience.
                    Since our founding, we've been curating an eccentric collection of records from legendary classics 
                    to today's top artists. Whether you're a seasoned collector or new to this hobby, our mission is to help you discover 
                    the soundtrack to your life.
                </p>
                <p>
                    We are passionate about supporting local artists, sharing stories, and creating a space where music lovers can connect.
                    Step into our store or browse online - either way, you are joining a community that keeps the art of vinyl alive.
                </p>

                <p id="about-us"> We hope to see you soon!</p>

                <Link to="/Shop" className="btn about-btn"> Shop Our Collection</Link>
            </div>
        </section>

        {/* Slider??? */}
         <section>
               <h2 id="home-events" >Upcoming Events 🗓️🎶</h2>
                    <Slider images={slides} />
         </section>

    </main>);
    }
}


export default Home;