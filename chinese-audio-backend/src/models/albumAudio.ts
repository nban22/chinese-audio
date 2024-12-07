"use strict";
import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "./connection";
import Album from "./album";
import Audio from "./audio";

class AlbumAudio extends Model<InferAttributes<AlbumAudio>, InferCreationAttributes<AlbumAudio>> {
    declare albumId: number;
    declare audioId: number;
}
AlbumAudio.init(
    {
        albumId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        audioId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
    },
    {
        sequelize,
        modelName: "AlbumAudio",
        freezeTableName: true,
    }
);

Album.belongsToMany(Audio, {
    through: AlbumAudio,
    as: "audios",
    foreignKey: "albumId",
    otherKey: "audioId",
});

Audio.belongsToMany(Album, {
    through: AlbumAudio,
    as: "albums",
    foreignKey: "audioId",
    otherKey: "albumId",
});

export default AlbumAudio;
