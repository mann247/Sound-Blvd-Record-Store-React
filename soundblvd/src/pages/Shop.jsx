import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet"; //title of website
import Config from "../Config.json";
import ProductCard from "../components/ProductCard";

const TITLE = Config.SITE_TITLE + " | Records For Sale";
const DESC = "Take a look at this months exclusive offerings.";
const API_URL = '/api/products';


function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log("--- Shop Component Started ---");
    useEffect(() => {

        console.log("fetching from:", API_URL)

        const fetchProducts = async () => {
            try {
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

    if (loading) {
        return <main><h1 className="page-title">Loading records...</h1></main>;
    }
    
    if (error) {
        return <main><h1 className="page-title">Error</h1><p>{error}</p></main>;
    }

    return (
        <main>
            <Helmet>
                <title> {TITLE} </title>
                <meta name="description" content={DESC} />
            </Helmet>
            <h1 className="page-title">Our Collection</h1>
     
           <section id="product-grid" className="product-grid" aria-live="polite">
                    {products.length > 0 ? (
                        products.map((product) => (
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