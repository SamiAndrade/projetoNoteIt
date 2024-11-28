import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token'); // Verifica se o token existe no localStorage

  if (!token) {
    // Se não tiver token, redireciona para o login
    return <Navigate to="/login" />;
  }

  return children; // Se o token existir, permite o acesso à rota
}

export default ProtectedRoute;
