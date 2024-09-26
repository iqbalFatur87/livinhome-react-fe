import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";

import { LOCAL_STORAGE, logout } from "../helper/helper";

const Middleware = () => {
  const params = useParams();
  const location = useLocation();
  const pathname = location.pathname;
  const parts = pathname.split("/");
  const pageName: number | string = params.id ? parts[parts.length - 2] : parts[parts.length - 1];

  if (pageName) {
    try {
      if (LOCAL_STORAGE()?.TOKEN) {
        return <Outlet />;
      } else {
        logout();
      }
    } catch (error) {
      logout();
    }
  } else {
    if (LOCAL_STORAGE()?.ROLE == "owner") {
      return <Navigate to="/owner/management-properti" />;
    } else {
      return <Navigate to="/dashboard" />;
    }
  }
};

export default Middleware;
