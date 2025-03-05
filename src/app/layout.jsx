// app/layout.jsx

import './styles/global.css';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Metadatos, etc. */}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
