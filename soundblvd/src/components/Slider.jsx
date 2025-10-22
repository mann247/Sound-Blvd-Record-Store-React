import React, { useEffect, useRef, useState } from 'react';

// Tiny slider: auto-advances and supports buttons
export default function Slider({ images = [] }){
  const [i, setI] = useState(0)
  const t = useRef(null)

  useEffect(()=>{
    t.current = setInterval(()=> setI(prev => (prev + 1) % images.length), 8000)
    return ()=> clearInterval(t.current)
  }, [images.length])

  if (!images.length) return null

  return (
    <div style={{ 
        position:'relative', 
        overflow:'hidden', 
          marginBottom:20 }}>

      {/* IMAGE */}
      <img src={images[i].src} alt={images[i].alt} style={{
        position: 'relative', 
        width: '100%',  
        height: '85vh',
        objectFit:'cover',
        overflow: 'hidden', 
        display:'block' }}/>

      {/* TEXT */}
       {images[i].caption && (
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '20px',
          color: 'white',
          background: 'rgba(0, 0, 0, 0.5)',
          padding: '10px 15px',
          borderRadius: '8px',
          maxWidth: '80%',
          fontSize: '1rem',
          lineHeight: '1.4'
        }}>
          {images[i].caption}
        </div>
      )}

      {/* buttons */}
      <div
  style={{
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-between',
    transform: 'translateY(-50%)',
    padding: '0 20px',
  }}
>
  <button
    onClick={() => setI((i - 1 + images.length) % images.length)}
    style={{
      background: 'rgba(0, 0, 0, 0.5)',
      border: 'none',
      color: '#fff',
      fontSize: '1.5rem',
      width: '45px',
      height: '45px',
      borderRadius: '50%',
      cursor: 'pointer',
      transition: 'background 0.3s ease',
    }}
    onMouseEnter={(e) => (e.target.style.background = 'rgba(0, 0, 0, 0.7)')}
    onMouseLeave={(e) => (e.target.style.background = 'rgba(0, 0, 0, 0.5)')}
  >
    ❮
  </button>

  <button
    onClick={() => setI((i + 1) % images.length)}
    style={{
      background: 'rgba(0, 0, 0, 0.5)',
      border: 'none',
      color: '#fff',
      fontSize: '1.5rem',
      width: '45px',
      height: '45px',
      borderRadius: '50%',
      cursor: 'pointer',
      transition: 'background 0.3s ease',
    }}
    onMouseEnter={(e) => (e.target.style.background = 'rgba(0, 0, 0, 0.7)')}
    onMouseLeave={(e) => (e.target.style.background = 'rgba(0, 0, 0, 0.5)')}
  >
    ❯
  </button>
</div>

    </div>
  )
}
