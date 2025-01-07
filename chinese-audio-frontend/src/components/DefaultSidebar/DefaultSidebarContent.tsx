import SidebarItem from "./DefaultSidebarItem";

interface SidebarContentProps {
  isCollapsed?: boolean;
}

const SidebarContent: React.FC<SidebarContentProps> = (props) => {
  return (
    <div className={`flex h-full flex-1 flex-col gap-3 overflow-auto ${props.isCollapsed ? 'custom-no-scrollbar' : 'custom-scrollbar'}`}>
      <SidebarItem
        isCollapsed={props.isCollapsed}
        avatar="https://via.placeholder.com/150"
        title="John Doe tititi ni sẽ dài ra nè hehehe hehehe hhe"
        type="Artist"
        axtraInfo="5 songs"
      />
      <SidebarItem
        isCollapsed={props.isCollapsed}
        avatar="https://via.placeholder.com/150"
        title="Your Playlist"
        type="Artist"
        axtraInfo="5 songs"
      />
      <SidebarItem
        isCollapsed={props.isCollapsed}
        avatar="https://via.placeholder.com/150"
        title="John Doe tititi ni sẽ dài ra nè hehehe hehehe hhe"
        type="Artist"
        axtraInfo="5 songs"
      />
      <SidebarItem
        isCollapsed={props.isCollapsed}
        avatar="https://via.placeholder.com/150"
        title="Your Playlist"
        type="Artist"
        axtraInfo="5 songs"
      />
      <SidebarItem
        isCollapsed={props.isCollapsed}
        avatar="https://via.placeholder.com/150"
        title="John Doe tititi ni sẽ dài ra nè hehehe hehehe hhe"
        type="Artist"
        axtraInfo="5 songs"
      />
      <SidebarItem
        isCollapsed={props.isCollapsed}
        avatar="https://via.placeholder.com/150"
        title="Your Playlist"
        type="Artist"
        axtraInfo="5 songs"
      />
      <SidebarItem
        isCollapsed={props.isCollapsed}
        avatar="https://via.placeholder.com/150"
        title="John Doe tititi ni sẽ dài ra nè hehehe hehehe hhe"
        type="Artist"
        axtraInfo="5 songs"
      />
      <SidebarItem
        isCollapsed={props.isCollapsed}
        avatar="https://via.placeholder.com/150"
        title="Your Playlist"
        type="Artist"
        axtraInfo="5 songs"
      />
      <SidebarItem
        isCollapsed={props.isCollapsed}
        avatar="https://via.placeholder.com/150"
        title="Recently Played"
        type="Artist"
        axtraInfo="5 songs"
      />

      <SidebarItem
        isCollapsed={props.isCollapsed}
        avatar="https://via.placeholder.com/150"
        title="Playlists 1 "
        type="Artist"
        axtraInfo="5 songs"
      />
    </div>
  );
};

export default SidebarContent;
