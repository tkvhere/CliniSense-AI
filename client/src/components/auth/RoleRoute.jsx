import { Navigate, Outlet } from "react-router-dom";
import { getUserRole } from "../../utils/auth";

const RoleRoute = ({ allowedRoles }) => {
  const role = getUserRole();

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;