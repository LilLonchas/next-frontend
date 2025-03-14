'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/productos.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No se encuentra el token de autenticación');

        const response = await fetch('http://localhost:3001/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error(`Error HTTP! Status: ${response.status}`);

        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Por motivos de seguridad, tendrás que registrarte en nuestra página para poder ver nuestros productos');
        setLoading(false);
        console.error('Fetch error:', err);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Comprobamos si el producto ya está en el carrito
    const existingProduct = cart.find((item) => item.id === product.id);

    if (!existingProduct) {
      cart.push({ ...product, quantity: 1 });  // Si no está, lo añadimos
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${product.name} añadido al carrito`);
    } else {
      alert(`${product.name} ya está en el carrito.`);
    }

    // Actualizamos el contador del carrito en localStorage y en Navbar
    const updatedCartCount = cart.length;
    localStorage.setItem('cartCount', updatedCartCount);
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="products-container">
      <h1>Productos</h1>
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.image || '/images/default-product.jpg'}
                alt={product.name}
                className="product-image"
              />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>${product.price}</p>
              <div className="product-buttons">
                <button onClick={() => router.push(`/product/${product.id}`)}>
                  Ver Detalles
                </button>
                <button onClick={() => handleAddToCart(product)}>
                  Añadir al Carrito
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles</p>
        )}
      </div>
    </div>
  );
}
