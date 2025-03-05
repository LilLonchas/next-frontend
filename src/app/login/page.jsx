// app/login/page.jsx

export default function LoginPage() {
    return (
      <div>
        <h1>Página de Login</h1>
        <form>
          <input type="text" placeholder="Usuario" />
          <input type="password" placeholder="Contraseña" />
          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
    );
  }
  