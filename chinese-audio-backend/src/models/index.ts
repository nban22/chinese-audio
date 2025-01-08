import Album from "./album";
import SeriesAlbum from "./seriesAlbum";
import Audio from "./audio";
import Series from "./series";
import AlbumAudio from "./albumAudio";
import User from "./user";

const models = [Album, Series, Audio, SeriesAlbum, AlbumAudio, User];

export const syncModels = async () => {
    for (const model of models) {
        await model.sync({ alter: true });
        // console.log(`Model ${model.name} synced`);
    }
};
