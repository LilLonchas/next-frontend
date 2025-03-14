'use client';

import { useEffect, useState } from 'react';

export default function AdminPanel() {
  const [admins, setAdmins] = useState([]);
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH inicial: Admins y Articulos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [adminRes, articuloRes] = await Promise.all([
          fetch('http://localhost:3001/admin'),
          fetch('http://localhost:3001/articulo')
        ]);

        if (!adminRes.ok || !articuloRes.ok) throw new Error('Error cargando datos');

        const adminsData = await adminRes.json();
        const articulosData = await articuloRes.json();

        setAdmins(adminsData);
        setArticulos(articulosData);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar datos:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Añadir Admin
  const handleAddAdmin = async (event) => {
    event.preventDefault();
    const form = event.target;

    const nuevoAdmin = {
      nombre: form.nombre.value,
      descripcion: form.descripcion.value,
      fotoUrl: form.fotoUrl.value
    };

    try {
      const res = await fetch('http://localhost:3001/admin', {
        method: 'POST',
        body: JSON.stringify(nuevoAdmin),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw new Error('Error al crear el admin');
      alert('Admin creado exitosamente');

      // Actualiza el listado de admins
      const updatedAdmins = await res.json();
      setAdmins([...admins, updatedAdmins]);
      form.reset();
    } catch (error) {
      console.error(error);
      alert('No se pudo crear el admin');
    }
  };

  // ✅ Añadir Artículo
  const handleAddArticulo = async (event) => {
    event.preventDefault();
    const form = event.target;

    const nuevoArticulo = {
      titulo: form.titulo.value,
      descripcion: form.descripcion.value,
      portadaUrl: form.portadaUrl.value,
      adminId: Number(form.adminId.value)
    };

    try {
      const res = await fetch('http://localhost:3001/articulo', {
        method: 'POST',
        body: JSON.stringify(nuevoArticulo),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw new Error('Error al crear el articulo');
      alert('Articulo creado exitosamente');

      // Actualiza el listado de articulos
      const updatedArticulo = await res.json();
      setArticulos([...articulos, updatedArticulo]);
      form.reset();
    } catch (error) {
      console.error(error);
      alert('No se pudo crear el articulo');
    }
  };

  if (loading) return <p>Cargando datos de administración...</p>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4">Panel de Administración</h1>

      {/* ✅ FORMULARIO PARA CREAR ADMIN */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Crear Nuevo Admin</h2>
        <form onSubmit={handleAddAdmin} className="space-y-4 border p-4 rounded">
          <div>
            <label>Nombre</label>
            <input type="text" name="nombre" required className="border w-full p-2 rounded" />
          </div>
          <div>
            <label>Descripción</label>
            <textarea name="descripcion" required className="border w-full p-2 rounded" />
          </div>
          <div>
            <label>Foto URL</label>
            <input type="text" name="fotoUrl" required className="border w-full p-2 rounded" />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Crear Admin
          </button>
        </form>

        <h3 className="text-xl mt-8 mb-2">Admins Existentes</h3>
        <ul className="space-y-2">
          {admins.map((admin) => (
            <li key={admin.id} className="border p-4 rounded flex items-center space-x-4">
              <img src={admin.fotoUrl} alt={admin.nombre} className="w-16 h-16 rounded-full object-cover" />
              <div>
                <p className="font-bold">{admin.nombre}</p>
                <p className="text-gray-600">{admin.descripcion}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ✅ FORMULARIO PARA CREAR ARTICULO */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Crear Nuevo Artículo</h2>
        <form onSubmit={handleAddArticulo} className="space-y-4 border p-4 rounded">
          <div>
            <label>Título</label>
            <input type="text" name="titulo" required className="border w-full p-2 rounded" />
          </div>
          <div>
            <label>Descripción</label>
            <textarea name="descripcion" required className="border w-full p-2 rounded" />
          </div>
          <div>
            <label>Portada URL</label>
            <input type="text" name="portadaUrl" required className="border w-full p-2 rounded" />
          </div>
          <div>
            <label>Admin Responsable</label>
            <select name="adminId" required className="border w-full p-2 rounded">
              <option value="">Seleccione un admin</option>
              {admins.map((admin) => (
                <option key={admin.id} value={admin.id}>
                  {admin.nombre}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            Crear Artículo
          </button>
        </form>

        <h3 className="text-xl mt-8 mb-2">Artículos Existentes</h3>
        <ul className="space-y-2">
          {articulos.map((articulo) => (
            <li key={articulo.id} className="border p-4 rounded">
              <p className="font-bold">{articulo.titulo}</p>
              <p className="text-gray-600">{articulo.descripcion}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
