import { Navigate, Outlet } from "react-router-dom";
import { TOKEN } from "../constant/localStorage";

const AuthMiddleware = () => {
  try {
    if (!localStorage.getItem(TOKEN.toString())) {
      return <Outlet />;
    } else {
      // console.log("sudah login");
      return <Navigate to="/dashboard" />;
    }
  } catch (error) {
    // console.log("error");
    return <Navigate to="/dashboard" />;
  }
};

export default AuthMiddleware;
