import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

interface AdminLayoutProps {}

const AdminLayout: React.FC<AdminLayoutProps> = () => {
  return (
    <div className="grid-admin-layout h-screen w-screen gap-[var(--panel-gap)] bg-zinc-950 p-[var(--panel-gap)]">
      <div className="grid-left-sidebar min-h-0 overflow-hidden rounded-md bg-zinc-900">
        <AdminSidebar />
      </div>
      <div className="grid-global-nav overflow-hidden rounded-md bg-zinc-900">
        <AdminHeader />
      </div>
      <div className="grid-main-view min-h-0 min-w-0 overflow-hidden rounded-md bg-zinc-900">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
