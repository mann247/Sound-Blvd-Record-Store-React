import React from 'react';

// The component receives the 'product' object as a prop
const ProductCard = ({ product }) => {
    
    // Destructure using database keys
    const { 
        id, 
        album_title, 
        artist, 
        product_type, // (Vinyl format)
        price, 
        description, 
        image_url 
    } = product;

    return (
        <div className="product-card">
            {/* 1. Image */}
            <img 
                src={image_url} 
                alt={`${album_title} by ${artist}`}
            />
            
            {/* 2. Title and Artist */}
            <h3>{album_title}</h3>
            <p className="artist-name">{artist}</p>
            
            {/* 3. Price and Type */}
            <p className="product-type">{product_type}</p>
            <p className="price">
                ${parseFloat(price).toFixed(2)} 
            </p>
            
            {/* 4. Description*/}
            <p className="description-preview">{description}</p>
            
            {/* 5. Action Button */}
            <button 
                className="cart-button" 
                aria-label={`View Details for ${album_title}`}
                onClick={() => console.log(`Viewing details for product ID: ${id}`)} 
            > View Product </button>
        </div>
    );
};

export default ProductCard;