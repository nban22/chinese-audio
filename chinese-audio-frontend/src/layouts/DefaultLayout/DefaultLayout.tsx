import DefaultHeader from "./DefaultHeader";
import NowPlayingBar from "./NowPlayingBar";
import DefaultSidebar from "./DefaultSidebar";
import NowPlayingView from "./NowPlayingView";
import { useState } from "react";
import { Outlet } from "react-router-dom";


interface DefaultLayoutProps {}

const DefaultLayout: React.FC<DefaultLayoutProps> = (props) => {
    const [hasNowPlayingView, setHasNowPlayingView] = useState(false);


  return (
    <div className={`${hasNowPlayingView ? 'grid-layout' : 'grid-layout-no-right-sidebar'} h-screen w-screen gap-[var(--panel-gap)] p-[var(--panel-gap)] bg-zinc-950`}>
      <div className="grid-global-nav">
        <DefaultHeader />
      </div>
      <div className="grid-left-sidebar bg-zinc-900 min-h-0 rounded-xl">
        <DefaultSidebar />
      </div>
      <div className="grid-main-view bg-zinc-900 min-h-0 min-w-0 rounded-xl overflow-hidden"><Outlet /></div>
        {hasNowPlayingView && (
            <div className="grid-now-playing-view bg-green-400">
            <NowPlayingView />
            </div>
        )}
      <div className="grid-now-playing-bar min-h-0 rounded-xl">
        <NowPlayingBar />
      </div>
    </div>
  );
};

export default DefaultLayout;
