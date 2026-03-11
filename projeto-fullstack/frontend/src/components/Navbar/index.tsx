import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-primary py-4 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src="/vard-logo.svg" alt="VARD Store" className="h-8" />
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-300 hover:text-white transition">
            Home
          </Link>
          <Link to="/sneakers" className="text-gray-300 hover:text-white transition">
            Catálogo
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/sneakers/new" className="text-gray-300 hover:text-white transition">
                Adicionar
              </Link>
              <span className="text-accent">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white transition"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white transition">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-accent px-4 py-2 rounded-lg text-white hover:bg-red-600 transition"
              >
                Cadastrar
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
