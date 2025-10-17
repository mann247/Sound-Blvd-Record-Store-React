export default function Footer(){
return (
<footer className="sb-footer">
    <div className="wrap container">
    <small>© {new Date().getFullYear()} Sound Blvd</small>
    <div className="sb-social">
    <a href="https://instagram.com/_nia.png" target="_blank" rel="noreferrer">Instagram</a>
    <a href="https://x.com" target="_blank" rel="noreferrer">X</a>
    <a href="https://medium.com/@ifsoundblvdcouldtalk" target="_blank" rel="noreferrer">Medium</a>
    </div>
</div>
</footer>
);
}