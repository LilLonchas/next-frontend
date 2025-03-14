// app/page.js (o cualquier página como profile/page.js)
import './styles/Home.css'
// import { useAuth } from '../contexts/authContext'; 
export default function Home() {
  return (
    <div>
      <title>PC COMPOÑENTES</title>
      <header>
        <h1>PC COMPOÑENTES</h1>
        <p>En nuestra web podrás encontrar productos de las primeras marcas a precios accesibles para todos los publicos.</p>
      </header>
      <main>
        <section id="titulo_productos">
          <h2>Algunos de nustros productos mas destacados</h2>
        </section>
        <section id="productos">
          <div className="product-container">
            <div className="product1">
              <img src="https://thumb.pccomponentes.com/w-530-530/articles/66/661854/1290-pny-xlr8-cs3040-ssd-4tb-m2-nvme-pcie-gen4x4.jpg" alt="Imagen de producto" />
              </div>
            </div>
            <div className="product-container">
            <div className="product2">
              <img src="https://thumb.pccomponentes.com/w-530-530/articles/1087/10870443/1415-amd-ryzen-9-9950x3d-43-57ghz-box.jpg" alt="Imagen de producto" />
              </div>
            </div>
            <div className="product-container">
            <div className="product3">
              <img src="https://thumb.pccomponentes.com/w-530-530/articles/1086/10867875/1186-pny-geforce-rtx-5090-argb-overclocked-triple-fan-32gb-gddr7-dlss4.jpg" alt="Imagen de producto" />
              </div>
            </div>

        </section>
      </main>
    </div>
  );
}
