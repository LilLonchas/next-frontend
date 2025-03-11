'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);  // Para mostrar un loading mientras se obtienen los productos
  const [error, setError] = useState(null); // Para manejar posibles errores
  const router = useRouter();

  useEffect(() => {
    // Función para obtener los productos
    const fetchProducts = async () => {
      try {
        // Obtener el token de localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No se encuentra el token de autenticación');
        }

        // Realizar la solicitud GET con el token en los encabezados
        const response = await fetch('http://localhost:3001/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  // Enviar el token en los encabezados
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);  // Guardar los productos en el estado
        setLoading(false);   // Dejar de mostrar el loading
      } catch (err) {
        setError('Error al cargar los productos');
        setLoading(false);   // Dejar de mostrar el loading en caso de error
        console.error('Fetch error:', err); // Mostrar el error en la consola
      }
    };

    fetchProducts(); // Llamar a la función para obtener los productos
  }, []);

  if (loading) {
    return <p>Cargando productos...</p>; // Mensaje mientras se cargan los productos
  }

  if (error) {
    return <p>{error}</p>; // Mostrar el error si ocurre alguno
  }

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
          <p>No hay productos disponibles</p>
        )}
      </div>
    </div>
  );
}
