import { AudioAttributes } from "../../../services/audioService";
import { formatDistanceToNow } from "date-fns";

interface AudioItemProps {
  audio?: AudioAttributes;
  index: number;
}

const AudioItem: React.FC<AudioItemProps> = ({ audio, index, ...props }) => {
  return (
    <div className="grid h-10 grid-cols-[40px_2fr_1fr_1fr_60px] items-center rounded-md hover:bg-zinc-700 hover:bg-opacity-50">
      <div className="pe-3 text-end">{index}</div>
      <div className="flex h-full min-h-0 items-center gap-3">
        <div className="h-full">
          <img
            src="https://robohash.org/1"
            className="h-full aspect-square rounded-md object-cover bg-zinc-800 bg-opacity-80 border border-zinc-700"
            alt="avatar"
          />
        </div>
        <div>
          <span className="cursor-pointer text-[1.05rem] text-white hover:underline">
            {audio?.title}
          </span>
        </div>
      </div>
      <div>None</div>
      <div>{formatDistanceToNow(audio?.createdAt!)}</div>
      <div className="pe-5 text-end">3:21</div>
    </div>
  );
};

export default AudioItem;
