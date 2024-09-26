import { Navigate, Outlet } from "react-router-dom";
import { LOCAL_STORAGE } from "../helper/helper";

const AuthMiddleware = () => {
  console.log(LOCAL_STORAGE());
  // return <Outlet />;
  try {
    if (!LOCAL_STORAGE()?.TOKEN) {
      return <Outlet />;
    } else {
      console.log("sudah login");
      return <Navigate to="/dashboard" />;
    }
  } catch (error) {
    console.log("error");
    return <Navigate to="/dashboard" />;
  }
};

export default AuthMiddleware;
