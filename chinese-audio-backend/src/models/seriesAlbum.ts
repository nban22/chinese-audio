"use strict";
import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import sequelize from "./connection";
import AlbumList from "./series";
import Album from "./album";

class SeriesAlbum extends Model<InferAttributes<SeriesAlbum>, InferCreationAttributes<SeriesAlbum>> {
    declare seriesId: number;
    declare albumId: number;
}

SeriesAlbum.init(
    {
        seriesId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        albumId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
    },
    {
        sequelize,
        modelName: "SeriesAlbum",
        freezeTableName: true,
        timestamps: false,
    }
);

AlbumList.belongsToMany(Album, {
    through: SeriesAlbum,
    as: "albums",
    foreignKey: "seriesId",
    otherKey: "albumId",
});

Album.belongsToMany(AlbumList, {
    through: SeriesAlbum,
    as: "series",
    foreignKey: "albumId",
    otherKey: "seriesId",
});

export default SeriesAlbum;
