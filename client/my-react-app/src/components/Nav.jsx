import { NavLink } from 'react-router-dom';


export default function Nav(){
return (
<nav className="sb-nav">
    <div className="wrap container">
    <div className="sb-brand">Sound Blvd</div>
    <div className="sb-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/contact">Contact</NavLink>
    </div>
    </div>
</nav>
);
}