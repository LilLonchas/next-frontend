'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    // Comprobar si el usuario está autenticado (usando localStorage como ejemplo)
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    // Obtener el número de productos en el carrito (simulado con localStorage)
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart.length);
  }, []);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo y enlaces principales */}
        <div>
          <Link href="/" className="text-xl font-bold">Mi Tienda</Link>
        </div>

        {/* Enlaces de navegación */}
        <div className="space-x-4">
          <Link href="/products" className="hover:text-gray-300">Productos</Link>
          {isAuthenticated ? (
            <>
              <span className="hover:text-gray-300">Hola, Usuario</span>
              <Link href="/logout" className="hover:text-gray-300">Cerrar sesión</Link>
            </>
          ) : (
            <Link href="/login" className="hover:text-gray-300">Iniciar sesión</Link>
          )}
          <Link href="/cart" className="hover:text-gray-300">
            Carrito ({cartItems})
          </Link>
        </div>
      </div>
    </nav>
  );
}
