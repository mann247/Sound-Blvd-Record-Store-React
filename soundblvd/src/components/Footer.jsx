import React from "react";

class Footer extends React.Component{
    render(){
        return (
           <footer class="social-media">
             {/* <p>&copy; 2025 Sound Blvd. Records</p> */}
            <div class="social-media">
            <a href="https://instagram.com/sound.blvd_" aria-label="Instagram" target="_blank"><img src={require('/Users/nmanningrth/Desktop/ecommerce v2.1/soundblvd/src/images/instagram.png')} alt="instagram logo"/></a>
            <a href="https://x.com/sound_blvd" aria-label="Twitter" target="_blank"><img src={require('/Users/nmanningrth/Desktop/ecommerce v2.1/soundblvd/src/images/twitter.png')}alt="twitter logo"/></a>
            <a href="https://medium.com/@ifsoundblvdcouldtalk" aria-label="Medium" target="_blank"><img src={require('/Users/nmanningrth/Desktop/ecommerce v2.1/soundblvd/src/images/medium.png')}alt="medium logo"/></a>
        </div>
          <small>© {new Date().getFullYear()} Sound Blvd. Records</small>
    </footer>
        );
    }

}
 
export default Footer;