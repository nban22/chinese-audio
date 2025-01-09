import {
  HomeIcon,
  InboxStackIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Form, Link } from "react-router-dom";

interface HeaderControlsProps {}

const HeaderControls: React.FC<HeaderControlsProps> = (props) => {
  return (
    <div className="flex gap-[var(--panel-gap)]">
      <Link to="/">
        <button className="flex aspect-square h-full transform items-center justify-center rounded-full bg-zinc-900 hover:scale-105">
          <HomeIcon className="h-7 w-7 text-white" />
        </button>
      </Link>
      <Form className="relative flex">
        <button className="absolute left-0 flex aspect-square h-full items-center justify-center rounded-full">
          <MagnifyingGlassIcon className="h-6 w-6 text-white" />
        </button>
        <input
          type="text"
          className="w-full min-w-0 rounded-full bg-zinc-900 px-12 py-3 outline-none hover:bg-zinc-800 hover:shadow-[inset_0_0_0_0.5px_#525252] focus:shadow-[inset_0_0_0_2px_#525252]"
        />
        <div className="absolute right-0 top-1/2 h-fit -translate-y-1/2 transform border-l border-zinc-700 pe-3 ps-3">
          <button className="flex aspect-square h-full items-center justify-center rounded-full">
            <InboxStackIcon className="h-6 w-6 text-white" />
          </button>
        </div>
      </Form>
    </div>
  );
};

export default HeaderControls;
