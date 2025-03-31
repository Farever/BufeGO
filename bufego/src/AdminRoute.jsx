import { Route, Navigate, Outlet } from 'react-router-dom';

const AdminRoute = ({ userData, children }) => {
  if (!userData) {
    return <Navigate to="/" replace />;
  }

  if (userData.is_admin != 1) {
    // Ha nincs megfelelő engedélye
    return <Navigate to="/" replace />; //Vagy egy "Nincs jogosultságod" oldalra
  }

  // Ha minden rendben, rendereljük a gyerek elemeket
  return children;
};

export default AdminRoute;