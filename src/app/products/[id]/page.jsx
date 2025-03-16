import React from 'react';

async function getProductoById(id) {
  const res = await fetch(`http://localhost:3001/articulo/${id}`);
  if (!res.ok) throw new Error('Error al obtener el producto');
  return res.json();
}

export default async function ProductoDetail({ params: { id } }) {
  const producto = await getProductoById(id);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4">{producto.titulo}</h1>
      <img src={producto.portadaUrl} alt={producto.titulo} className="w-full h-64 object-cover" />
      <p className="mt-4">{producto.descripcion}</p>
      <p className="text-gray-600 mt-2">
        Creado por: {producto.admin?.nombre || 'Sin admin asignado'}
      </p>
    </div>
  );
}
