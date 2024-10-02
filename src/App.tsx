import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
// import { Suspense, lazy } from "react";

import { createContext, useEffect, useState } from "react";
import {
  DaftarProperti,
  Dashboard,
  DashboardOwner,
  DetailProperti,
  InfoCalonPenyewaSewa,
  KonfirmasiPenyewa,
  ListPengajuanSewa,
  Login,
  ManagementProperti,
  PengajuanSurvei,
  Profil,
  Register,
  ResetPassword,
} from "./pages";
import AuthMiddleware from "./utils/middleware/AuthMiddleware";
import Middleware from "./utils/middleware/Middleware";
import LayoutOwner from "./pages/Owner/Layout";
import LayoutPengajuanSewa from "./pages/Owner/PengajuanSewa/Layout";

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
        <Route path="/" element={<Middleware />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* {localStorage?.role === "owner" ? ( */}
          <Route path="/" element={<LayoutOwner />}>
            <Route path="owner">
              <Route path="dashboard">
                <Route index element={<DashboardOwner />} />
              </Route>
              <Route path="pengajuan-survei" element={<PengajuanSurvei />} />
              <Route path="daftar-properti" element={<DaftarProperti />} />
              <Route path="management-properti">
                <Route index element={<ManagementProperti />} />
                <Route path="detail/:id" element={<DetailProperti />} />
              </Route>

              <Route path="pengajuan-sewa" element={<LayoutPengajuanSewa />}>
                <Route path="list" element={<ListPengajuanSewa />} />
                <Route path="info-pengajuan-sewa/:id" element={<InfoCalonPenyewaSewa />} />
                <Route path="konfirmasi-pengajuan-sewa" element={<KonfirmasiPenyewa />} />
              </Route>

              <Route path="profil" element={<Profil />} />
            </Route>
          </Route>
          {/* ) : null} */}
        </Route>
        <Route path="auth" element={<AuthMiddleware />}>
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
