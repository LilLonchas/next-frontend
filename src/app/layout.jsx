// app/layout.js
import Navbar from './Navbar/Navbar'; // Importa el Navbar
import './styles/global.css';  // Si tienes estilos globales

export default function Layout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Aquí puedes agregar meta tags, títulos, etc. */}
      </head>
      <body>
        {/* Navbar siempre visible */}
        <Navbar />
        
        {/* El contenido de la página actual se renderiza aquí */}
        <main>{children}</main>
      </body>
    </html>
  );
}
