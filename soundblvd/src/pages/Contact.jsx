import React from "react";
import {Helmet} from "react-helmet";
import Config from "../Config.json";


const TITLE = Config.SITE_TITLE + " | Contact Us";
const DESC = "Send us a message!";
class Contact extends React.Component{
    render(){
        return(
        <main>
            <Helmet>
                <title> {TITLE} </title>
                <meta name = "description" content={DESC}/>
            </Helmet>
            <h1> Contact Us</h1>
            <div>
                <p id="contact_form_info"> We would love to hear about your experience with Sound Blvd. Records! Sound Blvd. Records is a black & women-owned record store in Charlotte, NC. We sell LP's CDs, 7"s, cassettes, record storage & cleaning supplies, turntables, and anything you can name to help grow your record collection.</p>
                <p id="contact_form_info">We are willing to buy, and trade your LPs, 7"s, Cassettes, turntables, stereo equipments, etc. We also provide space for people to host their private music events. If you have any questions, please reach out to us via this form, and we will get back to you as soon as possible! </p>
            </div>
       
            <form  aria-label="Contact Form" id="contactForm" novalidate>
            {/* <!-- User Input for Name--> */}
            <label for="name">Name *</label>
            <input type="text" id="name" name="name" placeholder="Name" autocomplete="user-name" required/>
            {/* <span class="error-msg" id="name-error" aria-live="polite"></span> */}

            {/* <!-- User Input for Phone number--> */}
            <label for="phone">Phone *</label>
            <input type="tel" id="phone" name="phone" placeholder="704-XXX-XXXX" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
                inputmode="tel" autocomplete="tel-national" required/>
            {/* <span class="error-msg" id="phone-error" aria-live="polite"></span> */}
        
            {/* <!-- User Input for Email--> */}
            <label for="email">Email *</label>
            <input type="email" id="email" name="email" placeholder="sound.blvd@example.com" autocomplete="off" required/>
            {/* <span class="error-msg" id="email-error" aria-live="polite"></span> */}

            {/* <!-- User Input for Message--> */}
            <label for="comment">Your Message</label>
            <textarea id="comment" name="comment" rows="5" placeholder="Send it on."></textarea>
            {/* <span class="error-msg" id="message-error" aria-live="polite"></span> */}

            <button id="btn-contact" type="submit">Submit</button>
        </form>    
    </main>);
    }
}

export default Contact;