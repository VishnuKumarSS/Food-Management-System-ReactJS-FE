import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ adminOnly = false }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const isAdmin = userData && userData.is_admin;
  console.log("userData:", userData);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
export default RequireAuth;
