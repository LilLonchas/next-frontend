'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Mi Tienda</Link>

        <div className="space-x-4">
          <Link href="/products" className="hover:text-gray-300">Productos</Link>
          {isAuthenticated ? (
            <>
              <Link href="/profile" className="hover:text-gray-300">Mi Perfil</Link>
              <button onClick={handleLogout} className="hover:text-gray-300">Cerrar sesión</button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-gray-300">Iniciar sesión</Link>
              <Link href="/register" className="hover:text-gray-300">Registrarse</Link> {/* Aquí agregamos el botón de registro */}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
