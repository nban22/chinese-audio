import Album from "./album";
import AlbumList from "./albumlist";
import Audio from "./audio";
import AlbumList_Album from "./albumlist_album";
import Album_Audio from "./album_audio";

const models = [Album, AlbumList, Audio, AlbumList_Album, Album_Audio];

// Album.associate();
// AlbumList.associate();


for (const model of models) {
    model.sync();
}

