// app/layout.js
import Navbar from './Navbar/Navbar'; // Importa el Navbar
import './styles/global.css';  // Si tienes estilos globales
import { AuthProvider } from './contexts/authContext';

export default function Layout({ children }) {
  return (
    <AuthProvider>
    <html lang="es">
      <head>
        {/* Aquí puedes agregar meta tags, títulos, etc. */}
      </head>
      <body>
        {/* Navbar siempre visible */}
        <Navbar />
        
        {/* El contenido de la página actual se renderiza aquí */}
        <main>{children}</main>
        
      <footer>
        {/* Puedes agregar un footer aquí */}
        <h1>© 2025 Ruben Juan Fredi</h1>
      </footer>
      
      </body>
    </html>
    </AuthProvider>
  );
}
