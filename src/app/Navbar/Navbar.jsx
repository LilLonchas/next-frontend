'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/authContext';  // Importamos el hook para acceder al contexto
import { ShoppingCart } from 'lucide-react'; // Icono de carrito
import '../styles/nav.css';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { isAuthenticated, username, logout } = useAuth(); // Accedemos al estado de autenticación
  const [cartCount, setCartCount] = useState(0); // Estado para el contador del carrito
  const router = useRouter();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cart.length); // Actualiza el contador del carrito
  }, []);  // Solo se ejecuta una vez cuando el componente se monta

  // Función para cerrar sesión
  const handleLogout = () => {
    logout(); // Usamos el método de logout del contexto
    router.push('/login'); // Redirigimos a la página de login
  };

  const goHome = () => {
    router.push('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo" onClick={goHome}>
          <img src="/LOGO_IAW.png"/>
        </Link>

        <div className="navbar-links">
          <Link href="/products" className="navbar-item">Productos</Link>

          {/* Icono de carrito */}
          <Link href="/cart" className="navbar-item carrito">
            <ShoppingCart />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>

          {isAuthenticated ? (
            <>
              <span className="navbar-item">Bienvenido, {username}</span>
              <Link href="/profile" className="navbar-item">Mi Perfil</Link>
              <button onClick={handleLogout} className="navbar-item" id="cerrar-sesion">Cerrar sesión</button>
            </>
          ) : (
            <>
              <Link href="/login" className="navbar-item">Iniciar sesión</Link>
              <Link href="/register" className="navbar-item">Registrarse</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}