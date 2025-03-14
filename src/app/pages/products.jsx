// src/app/products/page.jsx
'use client';

import { useEffect, useState } from 'react';

export default function Products() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    // Asegúrate de que tu backend está corriendo en el puerto 3001
    fetch('http://localhost:3001/products')  // Cambia el puerto según tu backend
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Productos</h1>
      <div>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>${product.price}</p>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
    </div>
  );
}
