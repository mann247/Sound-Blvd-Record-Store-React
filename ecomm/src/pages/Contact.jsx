import React, { useState } from "react";
import Config from "../Config.json";

const TITLE = Config.SITE_TITLE + " | Contact Us";
const DESC = "Send us a message!";

// --- Initial State for Form Fields and Errors ---
const initialFormState = {
    name: '',
    phone: '',
    email: '',
    comment: '',
};

const initialErrorState = {
    name: '',
    phone: '',
    email: '',
    comment: '',
    form: ''
};

function Contact() {
    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState(initialErrorState);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- Validation Function (Core Logic) ---
    const validate = (data) => {
        let currentErrors = {};
        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/; // Matches 704-XXX-XXXX format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const nameRegex = /^[A-Za-z\s'-]+$/; // Letters, spaces, hyphens, and apostrophes
        
        // Name validation
        if (!data.name.trim()) {
            currentErrors.name = "Please enter your name.";
        } else if (!nameRegex.test(data.name.trim())) {
            currentErrors.name = "Name can only contain letters, spaces, hyphens, and apostrophes.";
        }
        
        // Phone validation
        if (!data.phone.trim()) {
            currentErrors.phone = "Phone number is required.";
        } else if (!phoneRegex.test(data.phone.trim())) {
            currentErrors.phone = "Please use the format 704-XXX-XXXX.";
        }

        // Email validation
        if (!data.email.trim()) {
            currentErrors.email = "Please enter your email.";
        } else if (!emailRegex.test(data.email.trim())) {
            currentErrors.email = "Please enter a valid email address.";
        }

        return currentErrors;
    };


    // --- Universal Input Change Handler ---
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
        
        // Clear error on change
        if (errors[name]) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
        }
    };


    // --- Blur Handler (Live validation) ---
    const handleBlur = (e) => {
        const { name } = e.target;
        // Validate only the field that lost focus
        const fieldErrors = validate({ ...initialFormState, [name]: formData[name] });
        
        setErrors(prevErrors => ({
            ...prevErrors, 
            [name]: fieldErrors[name] || ''
        }));
    };
    

    // --- Submission Handler ---
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate(formData);
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors({ ...initialErrorState, ...validationErrors });
            return;
        }

        setIsSubmitting(true);
        console.log('Form Submitted with Data:', formData);
        
        try {
        // This is the fetch call that POSTs the JSON data to your simplified Express route:
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            // Handle HTTP errors (e.g., status 400 from the backend validation)
            const errorData = await response.json();
            throw new Error(errorData.error || `Server error: ${response.status}`);
        }

        alert('Thank you for filling out the form! Your message has been received, we will reach back soon.');
        setFormData(initialFormState); 
        
    } catch (error) {
        console.error('Contact Form Submission Failed:', error);
        alert('Submission failed. Please check the console for server details.');
        setErrors(prev => ({ ...prev, form: 'Submission failed due to server error.' }));
    } finally {
        setIsSubmitting(false);
        setErrors(initialErrorState);
    }
    };

    return (
        <main>
               <>
                <title> {TITLE} </title>
                <meta name = "description" content={DESC}/>
            </>
            <h1> Contact Us</h1>
            <div>
                <p id="contact_form_info"> We would love to hear about your experience with Sound Blvd. Records. Sound Blvd. Records is a black & women-owned record store in Charlotte, NC. We sell LP's CDs, 7"s, cassettes, record storage & cleaning supplies, turntables, and anything you can name to help grow your record collection.</p>
                <p id="contact_form_info">We are willing to buy, and trade your LPs, 7"s, Cassettes, turntables, stereo equipments, etc. We also provide space for people to host their private music events. If you have any questions, please reach out to us via this form, and we will get back to you as soon as possible! </p>
            </div>
       
            <form onSubmit={handleSubmit} aria-label="Contact Form" id="contactForm" noValidate>
                {/* Name Field */}
                <label htmlFor="name">Name *</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Name" 
                    autoComplete="user-name" 
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.name ? 'input-error' : (formData.name && 'input-ok')}
                />
                <span className="error-msg" id="name-error" aria-live="polite">{errors.name}</span>

                {/* Phone Field */}
                <label htmlFor="phone">Phone *</label>
                <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    placeholder="704-XXX-XXXX" 
                    inputMode="tel" 
                    autoComplete="tel-national" 
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.phone ? 'input-error' : (formData.phone && 'input-ok')}
                />
                <span className="error-msg" id="phone-error" aria-live="polite">{errors.phone}</span>
            
                {/* Email Field */}
                <label htmlFor="email">Email *</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="sound.blvd@example.com" 
                    autoComplete="off" 
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.email ? 'input-error' : (formData.email && 'input-ok')}
                />
                <span className="error-msg" id="email-error" aria-live="polite">{errors.email}</span>

                {/* Message Field */}
                <label htmlFor="comment">Your Message</label>
                <textarea 
                    id="comment" 
                    name="comment" 
                    rows="5" 
                    placeholder="Send it on."
                    value={formData.comment}
                    onChange={handleChange}
                    onBlur={handleBlur}
                ></textarea>
                <span className="error-msg" id="message-error" aria-live="polite">{errors.comment}</span>

                <button id="btn-contact" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
                <span className="error-msg" aria-live="polite">{errors.form}</span>
            </form>    
        </main>
    );
}

export default Contact;