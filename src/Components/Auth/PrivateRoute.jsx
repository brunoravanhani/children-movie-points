import { Navigate, Outlet } from "react-router";

export function PrivateRoute ({ token, redirectPath = "/", children }){
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
