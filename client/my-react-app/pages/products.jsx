import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard.js';
import Filters from '../components/Filters.js';


const API = import.meta.env.VITE_API_URL;


export default function Products(){
    const [items, setItems] = useState([]);
    const [type, setType] = useState('');
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const [q, setQ] = useState('');
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);


useEffect(()=>{
const params = new URLSearchParams({
    ...(type && { type }),
    ...(priceMin && { priceMin }),
    ...(priceMax && { priceMax }),
    ...(q && { q }),
    page, limit: 12
});
fetch(`${API}/api/products?${params.toString()}`)
.then(r=>r.json())
.then(({ data, total }) => { setItems(data); setTotal(total); });
}, [type, priceMin, priceMax, q, page]);


const totalPages = Math.ceil(total / 12) || 1;


return (
<main className="container">
    <h1>Products</h1>
        <Filters
        q={q} setQ={setQ}
        type={type} setType={setType}
        priceMin={priceMin} setPriceMin={setPriceMin}
        priceMax={priceMax} setPriceMax={setPriceMax}
        />


    <section className="grid">
    {items.map(p => <ProductCard key={p.id} p={p} />)}
    </section>


<nav className="pager">
    <button disabled={page<=1} onClick={()=>setPage(p=>p-1)}>Prev</button>
    <span>{page} / {totalPages}</span>
    <button disabled={page>=totalPages} onClick={()=>setPage(p=>p+1)}>Next</button>
    </nav>
</main>
);
}