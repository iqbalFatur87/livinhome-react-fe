import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,} from "react-router-dom";
// import { Suspense, lazy } from "react";
import "./App.css";
import {createContext, useEffect, useState} from "react";
import {
  Cart,
  ChatTenant,
  DaftarProperti,
  Dashboard,
  DashboardOwner,
  DetailChatTenant,
  DetailPemilik,
  DetailPensanan,
  DetailPenyewa,
  DetailProperti,
  DetailPropertiTenat,
  DetailTransaction,
  IndexAdmin,
  InfoCalonPenyewaSewa,
  KonfirmasiPenyewa,
  ListPengajuanSewa,
  ListPenyewa,
  Login,
  LoginAdmin,
  ManagementProperti,
  PemilikApartement,
  PemilikKontrakan,
  PemilikKost,
  PengajuanSurvei,
  PenyewaApartement,
  PenyewaKontrakan,
  PenyewaKost,
  Profil,
  ProfileTenant,
  Register,
  ResetPassword,
  Searching,
  Status,
  SuccessTransaction,
  Survey,
  SurveyBatal,
  Transaction,
  UploadPembayaran,
} from "./pages";
import AuthMiddleware from "./utils/middleware/AuthMiddleware";
import Middleware from "./utils/middleware/Middleware";
import LayoutOwner from "./pages/Owner/Layout";
import LayoutPengajuanSewa from "./pages/Owner/PengajuanSewa/Layout";
import LayoutTenant from "./pages/Tenant/Layout";
import LayoutAdmin from "./pages/Admin/layouts";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
// const Dashboard = lazy((): any => import("./pages/Dashboard"));
export const ThemeContext: any = createContext(null);

const queryClient = new QueryClient();

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
        <Route path="/" element={<LayoutTenant />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/" element={<Middleware />}>
        <Route path="/" element={<LayoutTenant />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<ProfileTenant />} />
          <Route path="detail-properti/:id" element={<DetailPropertiTenat />} />
          <Route path="chat" element={<ChatTenant />} />
          <Route path="chat/:id" element={<DetailChatTenant/>} />
          <Route path="cart" element={<Cart />} />
          <Route path="searching" element={<Searching />} />
          <Route path="transaction/:id" element={<Transaction />} />
          <Route
            path="success-transaction/:id"
            element={<SuccessTransaction />}
          />
          <Route
            path="transaction-detail/:id"
            element={<DetailTransaction />}
          />
          <Route
            path="UploadPembayaran/:id"
            element={<UploadPembayaran/>}
          />
          <Route path="survey/:id" element={<Survey />} />
          <Route path="survey/batal/:id" element={<SurveyBatal />} />
          <Route path="status" element={<Status />} />
          </Route>

          <Route path="owner" element={<LayoutOwner />}>
            <Route path="dashboard" element={<DashboardOwner />} />
            <Route path="pengajuan-survei" element={<PengajuanSurvei />} />
            <Route path="daftar-properti" element={<DaftarProperti />} />
            <Route path="management-properti">
              <Route index element={<ManagementProperti />} />
              <Route path="detail/:id" element={<DetailProperti />} />
            </Route>

            <Route path="pengajuan-sewa" element={<LayoutPengajuanSewa />}>
              <Route path="list" element={<ListPengajuanSewa />} />
              <Route
                path="info-pengajuan-sewa/:id"
                element={<InfoCalonPenyewaSewa />}
              />
              <Route
                path="konfirmasi-pengajuan-sewa"
                element={<KonfirmasiPenyewa />}
              />
            </Route>

            <Route path="profil" element={<Profil />} />
          </Route>
        </Route>

        <Route path="login" element={<LoginAdmin />} />
        <Route path="admin" element={<LayoutAdmin />}>
          <Route path="dashboard" element={<IndexAdmin />} />
          <Route path="pemilik-kost" element={<PemilikKost />} />
          <Route path="penyewa-kost" element={<PenyewaKost />} />
          <Route path="pemilik-apartement" element={<PemilikApartement />} />
          <Route path="penyewa-apartement" element={<PenyewaApartement />} />
          <Route path="pemilik-kontrakan" element={<PemilikKontrakan />} />
          <Route path="pemilik-detail/:id" element={<DetailPemilik />} />
          <Route path="penyewa-kontrakan" element={<PenyewaKontrakan />} />
          <Route path="penyewa-detail/:id" element={<DetailPenyewa />} />
          <Route path="list-pemesanan" element={<ListPenyewa />} />
          <Route path="pesanan-detail/:id" element={<DetailPensanan />} />
        </Route>

        <Route path="auth" element={<AuthMiddleware />}>
          <Route path="login" element={<Login />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/error" element={<h1>Error</h1>} />
      </>
    )
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContext.Provider value={{ currentTheme, switchTheme }}>
        <RouterProvider router={router} />
      </ThemeContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
