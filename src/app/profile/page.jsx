'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/profile.css';

export default function Profile() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetch('http://localhost:3001/user/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setUser(data.user))
      .catch(() => {
        localStorage.removeItem('token');
        router.push('/login');
      });
  }, []);

  if (!user) return <p>Cargando...</p>;

  return (
    <div className="container">
      <h1>Perfil de {user.username}</h1>
      <button onClick={() => {
        localStorage.removeItem('token');
        router.push('/login');
      }}>
        Cerrar sesión
      </button>
    </div>
  );
}
