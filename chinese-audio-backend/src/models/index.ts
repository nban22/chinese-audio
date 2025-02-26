import Album from "./album";
import SeriesAlbum from "./seriesAlbum";
import Audio from "./audio";
import Series from "./series";
import AlbumAudio from "./albumAudio";
import User from "./user";
import Image from "./image";

const models = [Album, Series, Audio, Image, SeriesAlbum, AlbumAudio, User];

export const syncModels = async () => {
    for (const model of models) {
        await model.sync({ alter: true });
        // console.log(`Model ${model.name} synced`);
    }

    // Define associations
    Album.hasOne(Image, {
        foreignKey: "ownerId", // ownerId trong Image trỏ tới Album.id
        constraints: false, // Không tạo ràng buộc khóa ngoại vì polymorphic
        scope: { ownerType: "Album" }, // Chỉ lấy Image có ownerType là "Album"
        as: "Image", // Alias để dùng trong include
    });

    Image.belongsTo(Album, {
        foreignKey: "ownerId",
        constraints: false, // Không ràng buộc vì polymorphic
        as: "Album", // Alias tùy chọn, không bắt buộc dùng trong include
    });
};
