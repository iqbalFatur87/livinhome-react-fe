export { default as Dashboard } from "./Dashboard";

// AUTHENTICATION
export { default as Login } from "./Authentication/Login";
export { default as LoginAdmin } from "./Authentication/Login/admin/index";
export { default as ResetPassword } from "./Authentication/ResetPassword";
export { default as Register } from "./Authentication/Register";

// OWNER
export { default as DashboardOwner } from "./Owner/Dashboard";

export { default as DaftarProperti } from "./Owner/DaftarProperti";

export { default as ManagementProperti } from "./Owner/ManagemenProperti";
export { default as DetailProperti } from "./Owner/ManagemenProperti/Detail";

export { default as ListPengajuanSewa } from "./Owner/PengajuanSewa/List";
export { default as InfoCalonPenyewaSewa } from "./Owner/PengajuanSewa/Info";
export { default as KonfirmasiPenyewa } from "./Owner/PengajuanSewa/Confirm";

export { default as PengajuanSurvei } from "./Owner/PengajuanSurvei";
export { default as Profil } from "./Owner/Profil";

export { default as Chat } from "./Owner/Chat";

//Layout
export { default as LayoutOwner } from "./Owner/Layout";
export { default as LayoutPengajuanSewa } from "./Owner/PengajuanSewa/Layout";

// RENTER
export { default as Search } from "./Renter/Search";

//Layout
export { default as LayoutRenter } from "./Renter/Layout";
// Tenant
export { default as ProfileTenant } from "./Tenant/Profile/index";
export { default as LivinMates } from "./Tenant/LivinMates/index";
export { default as DetailPropertiTenat } from "./Tenant/Properti/DetailProperti/index";
export { default as Searching } from "./Tenant/Properti/Search/index";
export { default as ChatTenant } from "./Tenant/Chat/components/ListChats";
export { default as DetailChatTenant } from "./Tenant/Chat/components/DetailChats";
export { default as Cart } from "./Tenant/Cart/index";

// Survey

export { default as Survey } from "./Tenant/survey/index";
export { default as Status } from "./Tenant/survey/berhasil/index";
export { default as SurveyBatal } from "./Tenant/survey/pembatalan/index";

// Transaction
export { default as Transaction } from "./Tenant/transaction/index";
export { default as DetailTransaction } from "./Tenant/transaction/detail-transaksi";
export  {default as SuccessTransaction } from './Tenant/transaction/berhasil'

// Layout admin

export { default as LayoutAdmin } from "./Admin/layouts";

// Admin

export { default as IndexAdmin } from "./Admin/dashboard/index";
export { default as PemilikKontrakan } from "./Admin/Pemilik/kontrakan/index";
export { default as PemilikKost } from "./Admin/Pemilik/kost/index";
export { default as PemilikApartement } from "./Admin/Pemilik/apartemen/index";
export {default as DetailPemilik } from "./Admin/Pemilik/detail/index"

export { default as PenyewaKost } from "./Admin/Penyewa/kost/index";
export { default as PenyewaKontrakan } from "./Admin/Penyewa/kontrakan/index";
export { default as PenyewaApartement } from "./Admin/Penyewa/apartement/index";
export {default as DetailPenyewa } from "./Admin/Penyewa/detail/index";
export {default as DetailPensanan } from "./Admin/list-penyewa/detail/index";
export { default as ListPenyewa } from "./Admin/list-penyewa/index";

