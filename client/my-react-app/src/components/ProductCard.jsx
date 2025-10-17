export default function ProductCard({ p }){
return (
<article className="card">
<img src={p.image_url} alt={`${p.name} by ${p.artist}`} />
    <div className="pad">
    <h3>{p.name}</h3>
    {p.artist && <p className="muted">{p.artist}</p>}
    <p className="price">${Number(p.price).toFixed(2)}</p>
</div>
</article>
);
}