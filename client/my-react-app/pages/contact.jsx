import { useState } from 'react';


function isEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }


export default function Contact(){
const [form, setForm] = useState({ name:'', email:'', message:'' });
const [errors, setErrors] = useState({});


const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));


const onSubmit = (e)=>{
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!isEmail(form.email)) errs.email = 'Enter a valid email';
    if (!form.message.trim()) errs.message = 'Tell us something!';
    setErrors(errs);
    if (Object.keys(errs).length === 0){
    alert('Submitted!');

    setForm({ name:'', email:'', message:'' });
    }
};


return (
<main className="container">
    <h1>Contact</h1>
    <form className="form" noValidate onSubmit={onSubmit}>
        <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" value={form.name} onChange={onChange} />
        {errors.name && <div className="error">{errors.name}</div>}
        </div>
        <div className="field">
    <label htmlFor="email">Email</label>
        <input id="email" name="email" value={form.email} onChange={onChange} />
        {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div className="field">
    <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows="6" value={form.message} onChange={onChange} />
        {errors.message && <div className="error">{errors.message}</div>}
        </div>
        <button className="btn" type="submit">Send</button>
    </form>
</main>
);
}