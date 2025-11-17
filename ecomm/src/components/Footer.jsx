import React from "react";
import instagram from '../assets/instagram.png';
import twitter from '../assets/twitter.png';
import medium from '../assets/medium.png';

class Footer extends React.Component{
    render(){
        return (
           <footer className="social-media">
            <div className="social-media">
            <a href="https://instagram.com/sound.blvd_" aria-label="Instagram" target="_blank"><img src={instagram} alt="instagram logo"/></a>
            <a href="https://x.com/sound_blvd" aria-label="Twitter" target="_blank"><img src={twitter}alt="twitter logo"/></a>
            <a href="https://medium.com/@ifsoundblvdcouldtalk" aria-label="Medium" target="_blank"><img src={medium}alt="medium logo"/></a>
        </div>
          <small>© {new Date().getFullYear()} Sound Blvd. Records</small>
    </footer>
        );
    }

}
 
export default Footer;