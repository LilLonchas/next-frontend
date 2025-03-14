import Link from 'next/link';

async function getProductos() {
  const res = await fetch('http://localhost:3001/articulo', {
    cache: 'no-store', // Desactiva cache si usas SSR en Next 13+
  });
  if (!res.ok) throw new Error('Failed to fetch productos');
  return res.json();
}

export default async function ProductsPage() {
  const productos = await getProductos();

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4">Productos Disponibles</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {productos.map((producto) => (
          <Link href={`/products/${producto.id}`} key={producto.id}>
            <div className="border p-4 rounded-lg hover:shadow-lg transition">
              <img
                src={producto.portadaUrl || '/images/default-product.jpg'}
                alt={producto.titulo}
                className="w-full h-48 object-cover"
              />
              <h2 className="text-xl font-semibold mt-2">{producto.titulo}</h2>
              <p className="text-gray-600">{producto.descripcion}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}





/* 'use client';

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

        const response = await fetch('http://localhost:3001/articulo', {  //antes era products  lo tare de la BD
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
 */