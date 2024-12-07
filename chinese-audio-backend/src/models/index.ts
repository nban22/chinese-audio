import Album from "./album";
import SeriesAlbum from "./seriesAlbum";
import Audio from "./audio";
import Series from "./series";
import AlbumAudio from "./albumAudio";

const models = [Album, Series, Audio, SeriesAlbum, AlbumAudio];

export const syncModels = async () => {
    for (const model of models) {
        await model.sync({ alter: true });
        // console.log(`Model ${model.name} synced`);
    }
};
