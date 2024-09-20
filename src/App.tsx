import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
// import { Suspense, lazy } from "react";

import { createContext, useEffect, useState } from "react";
import { DaftarProperti, Dashboard, Login, ManagementProperti, PengajuanSewa, Register, ResetPassword } from "./pages";
import AuthMiddleware from "./utils/middleware/AuthMiddleware";
import Middleware from "./utils/middleware/Middleware";

// const Dashboard = lazy((): any => import("./pages/Dashboard"));
export const ThemeContext: any = createContext(null);
function App() {
  const [currentTheme, setCurrentTheme] = useState(false);
  const switchTheme = () => {
    setCurrentTheme(!currentTheme);
    localStorage.currentTheme = !currentTheme;
  };
  useEffect(() => {
    try {
      setCurrentTheme(JSON.parse(localStorage.currentTheme));
    } catch (error) {
      setCurrentTheme(false);
      localStorage.currentTheme = false;
    }
  }, []);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* <Route path="/" element={<Middleware />}>
          <Route path="/" element={<Layout />}>
            <Route path="/">
              <Route index element={<Dashboard />} />
            </Route>

            <Route path="/about">
              <Route index element={<h1>About Page</h1>} />
              <Route
                path="About-child-page"
                element={<h1>About Child Page</h1>}
              />
            </Route>
          </Route>
        </Route> */}

        <Route path="/" element={<Middleware />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/owner">
            <Route path="daftar-properti" element={<DaftarProperti />} />
            <Route path="management-properti" element={<ManagementProperti />} />
            <Route path="pengajuan-sewa" element={<PengajuanSewa />} />
          </Route>
        </Route>
        <Route path="/auth" element={<AuthMiddleware />}>
          <Route path="login" element={<Login />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="*" element={<h1>not found</h1>} />
        <Route path="/error" element={<h1>error</h1>} />
      </>
    )
  );
  return (
    <ThemeContext.Provider value={{ currentTheme, switchTheme }}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  );
}

export default App;
