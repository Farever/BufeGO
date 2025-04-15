import { useContext, useState } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { AdminBufeContext, AuthContext } from './Contexts';

const AdminRoute = ({requireBuffet, children }) => {
  const {userData} = useContext(AuthContext);
  const {adminBufe} = useContext(AdminBufeContext)

  if (Object.keys(userData).length === 0) {
    return <Navigate to="/forbidden" replace />;
  }

  if (userData.is_admin != 1) {
    return <Navigate to="/forbidden" replace />;
  }

  if(requireBuffet && adminBufe == null){
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default AdminRoute;