import styled from "styled-components";
import AdminSiderbarHead from "../../components/admin/AdminSidebar/AdminSiderbarHead";
import AdminSiderbarItem from "../../components/admin/AdminSidebar/AdminSiderbarItem";
import AdminSiderbarFoot from "../../components/admin/AdminSidebar/AdminSiderbarFoot";
import IconHome from "../../icons/IconHome";
import IconUsers from "../../icons/IconUsers";
import IconFileAudio from "../../icons/IconFileAudio";
import IconAlbums from "../../icons/IconAlbums";
import IconSetting from "../../icons/IconSetting";
import IconAccountCircle from "../../icons/IconAccountCircle";

const StyledAdminSidebar = styled.div`
    grid-area: sidebar;
    background-color: var(--gray-background-color, #111);
    color: var(--white-text-color, #fff);
    padding: 10px;
    border-radius: 10px;
    overflow: hidden;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const AboveSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
`;

interface AdminSidebarProps {
    className?: string;
}

const AdminSidebar: React.FC<AdminSidebarProps> = (props) => {
    return (
        <nav className="h-full flex flex-col justify-between">
            <div className="flex flex-col gap-4 px-3">
                <AdminSiderbarHead />
                <AdminSiderbarItem title="Dashboard" icon={<IconHome size={30} />} to="dashboard"/>
                <AdminSiderbarItem title="Users" icon={<IconUsers size={30} />} to="management/user"/>
                <AdminSiderbarItem title="Audio Management" icon={<IconFileAudio size={30} />} to="management/audio"/>
                <AdminSiderbarItem title="Album Management" icon={<IconAlbums size={30} />} to="management/album"/>
            </div>
            <div>
                <AdminSiderbarItem title="Settings" icon={<IconSetting size={30} />} to="settings"/>
                <AdminSiderbarItem title="Account Profile" icon={<IconAccountCircle size={30} />} to="account-profile"/>
            </div>
        </nav>
    );
};

export default AdminSidebar;
