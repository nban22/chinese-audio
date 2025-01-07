import DefaultHeader from "./DefaultHeader";
import NowPlayingBar from "./NowPlayingBar";
import DefaultSidebar from "./DefaultSidebar";
import NowPlayingView from "./NowPlayingView";
import { useState } from "react";
import { Outlet } from "react-router-dom";


interface DefaultLayoutProps {}

const DefaultLayout: React.FC<DefaultLayoutProps> = (props) => {
    const [hasNowPlayingView, setHasNowPlayingView] = useState(true);


  return (
    <div className={`${hasNowPlayingView ? 'grid-layout' : 'grid-layout-no-right-sidebar'} h-screen w-screen gap-[var(--panel-gap)] p-[var(--panel-gap)]`}>
      <div className="grid-global-nav bg-red-400">
        <DefaultHeader />
      </div>
      <div className="grid-left-sidebar bg-zinc-900">
        <DefaultSidebar />
      </div>
      <div className="grid-main-view bg-blue-400"><Outlet /></div>
        {hasNowPlayingView && (
            <div className="grid-now-playing-view bg-green-400">
            <NowPlayingView />
            </div>
        )}
      <div className="grid-now-playing-bar bg-yellow-300">
        <NowPlayingBar />
      </div>
    </div>
  );
};

export default DefaultLayout;
