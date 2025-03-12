'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/authContext';  // Importamos el hook para acceder al contexto
import '../styles/nav.css';

export default function Navbar() {
  const { isAuthenticated, username, logout } = useAuth(); // Accedemos al estado de autenticación
  const router = useRouter();

  // Función para cerrar sesión
  const handleLogout = () => {
    logout(); // Usamos el método de logout del contexto
    router.push('/login'); // Redirigimos a la página de login
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">Mi Tienda</Link>

        <div className="navbar-links">
          <Link href="/products" className="navbar-item">Productos</Link>

          {/* Si el usuario está autenticado, mostramos su nombre y las opciones de perfil y cerrar sesión */}
          {isAuthenticated ? (
            <>
              <span className="navbar-item">Bienvenido, {username}</span> 
              <Link href="/profile" className="navbar-item">Mi Perfil</Link>
              <button onClick={handleLogout} className="navbar-item">Cerrar sesión</button>
            </>
          ) : (
            // Si el usuario no está autenticado, mostramos las opciones de login y registro
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
