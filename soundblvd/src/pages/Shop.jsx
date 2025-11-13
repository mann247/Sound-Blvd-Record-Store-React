import React, {useEffect, useState} from "react";
// import {Helmet} from "react-helmet"; //title of website
import Config from "../Config.json";
import ProductCard from "../components/ProductCard";

const API_URL = '/api/products';
const TITLE = Config.SITE_TITLE + " | Records For Sale";
const DESC = "Take a look at this months exclusive offerings.";


function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log("--- Shop Component Started ---");

    //filter functionality
    const [filterType, setFilterType] = useState('All');
    const [filterPrice, setFilterPrice] = useState('All');
    useEffect(() => {

        console.log("fetching from:", API_URL)

        const fetchProducts = async () => {
            try {
                //Fetching fb using relative url
                const response = await fetch(API_URL);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setProducts(data);
            } catch (err) {
                console.error("Error loading products:", err);
                setError("Failed to load records. Please check the API connection.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    //filtering
    const uniqueTypes = [...new Set(products.map(p => p.product_type))].sort();

    const filteredProducts = products.filter(product => {
        const matchesType = filterType === 'All' || product.product_type === filterType;
        let matchesPrice = true;

        if(filterPrice !== 'All'){
            const [min, max] = filterPrice.split('-').map(Number);
            const productPrice = parseFloat(product.price);

            if (max) {
                // If it's a range (e.g., '25-50')
                matchesPrice = productPrice >= min && productPrice <= max;
            } else {
                // If it's an upper bound (e.g., '50+') - Note: We used '50-999' as the upper bound filter option.
                matchesPrice = productPrice >= min;
            }
        }

        return matchesType && matchesPrice;
    })

    //filter changes
    const handleTypeChange = (e) => setFilterType(e.target.value);
    const handlePriceChange = (e) => setFilterPrice(e.target.value);

    //edge case to ensure records are rendered properly
    if (loading) {
        return <main><h1 className="page-title">Loading records...</h1></main>;
    }
    if (error) {
        return <main><h1 className="page-title">Error</h1><p>{error}</p></main>;
    }

    return (
        <main>
               <>
                <title> {TITLE} </title>
                <meta name = "description" content={DESC}/>
            </>

            <h1 className="page-title">Our Collection</h1>

            <div className="filter-controls">
                
                {/* Product Type Filter */}
                <label htmlFor="type-filter">Filter by Format:</label>
                <select id="type-filter" value={filterType} onChange={handleTypeChange}>
                    <option value="All">All Formats</option>
                    {uniqueTypes.map(type => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>

                {/* Price Filter */}
                <label htmlFor="price-filter">Filter by Price:</label>
                <select id="price-filter" value={filterPrice} onChange={handlePriceChange}>
                    <option value="All">All Prices</option>
                    <option value="0-25">$0 - $25</option>
                    <option value="25-50">$25 - $50</option>
                    <option value="50-999">$50+</option>
                </select>
            </div>
     
           <section id="product-grid" className="product-grid" aria-live="polite">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <ProductCard 
                                key={product.id} 
                                product={product} 
                            />
                        ))
                    ) : (
                    <p>No records found in the collection.</p>
                )}
            </section>
        </main>
    );
}
export default Shop;