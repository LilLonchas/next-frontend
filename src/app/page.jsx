import Navbar from './Navbar/Navbar';  // Importa el Navbar

export default function Home() {
  return (
    <div>
      <Navbar />
      <h1 className="text-4xl text-center mt-10">Bienvenido a la Página Principal</h1>
    </div>
  );
}
