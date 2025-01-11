import ListContainer from "./ListContainer";
import { Link, useNavigate } from "react-router-dom";
import { AlbumListAttributes } from "../../services/seriesService";

interface AlbumListProps {
  showAll?: boolean;
  albumList?: AlbumListAttributes;
}

const AlbumList: React.FC<AlbumListProps> = ({
  showAll = false,
  albumList,
}) => {
  const navigate = useNavigate();
  const handleShowAll = () => {
    navigate(`/section/${albumList?.id}`);
  };
  return (
    <section className="">
      <div className="px-5 mb-2 mt-5 flex items-center justify-between">
        <h2
          onClick={handleShowAll}
          className="cursor-pointer text-2xl font-bold text-zinc-100 hover:underline"
        >
          {albumList?.title}
        </h2>
        {showAll ? (
          ""
        ) : (
          <Link
            to={`/section/${albumList?.id}`}
            className="text-sm font-bold text-zinc-100 hover:underline"
          >
            Show all
          </Link>
        )}
      </div>
      <ListContainer showAll={showAll} albums={albumList?.albums} />
    </section>
  );
};

export default AlbumList;
