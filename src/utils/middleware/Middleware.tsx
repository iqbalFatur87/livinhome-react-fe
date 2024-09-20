import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { TOKEN } from "../constant/localStorage";

const Middleware = () => {
  const params = useParams();
  const location = useLocation();
  const pathname = location.pathname;
  const parts = pathname.split("/");
  const pageName: number | string = params.id ? parts[parts.length - 2] : parts[parts.length - 1];

  // const navigate = useNavigate();
  if (pageName) {
    try {
      if (localStorage.getItem(TOKEN)) {
        return <Outlet />;
      } else {
        localStorage.clear();
        return <Navigate to="/auth/login" />;
      }
    } catch (error) {
      localStorage.clear();
      return <Navigate to="/auth/login" />;
    }
  } else {
    return <Navigate to="/dashboard" />;
  }
};

export default Middleware;
