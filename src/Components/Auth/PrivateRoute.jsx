import { Navigate, Outlet } from "react-router";
import Navbar from '../Navbar/Navbar.jsx';

export function PrivateRoute ({ token, redirectPath = "/", children }){
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
  <>
    <Navbar />
    {children ? children : <Outlet />}
  </>);
};
