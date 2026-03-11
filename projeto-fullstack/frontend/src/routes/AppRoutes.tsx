import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Navbar } from '../components/Navbar';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Sneakers } from '../pages/Sneakers';
import { CreateSneaker } from '../pages/CreateSneaker';
import { EditSneaker } from '../pages/EditSneaker';

interface PrivateRouteProps {
  children: React.ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sneakers" element={<Sneakers />} />
        <Route
          path="/sneakers/new"
          element={
            <PrivateRoute>
              <CreateSneaker />
            </PrivateRoute>
          }
        />
        <Route
          path="/sneakers/edit/:id"
          element={
            <PrivateRoute>
              <EditSneaker />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
