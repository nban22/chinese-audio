"use strict";
import { Model, DataTypes } from "sequelize";
import sequelize from "./connection";
import AlbumList from "./albumlist";
import Album from "./album";

export interface AlbumList_AlbumAttributes {
    albumListId?: number;
    albumId?: number;
}
class AlbumList_Album extends Model<AlbumList_AlbumAttributes> implements AlbumList_AlbumAttributes {
    albumListId?: number;
    albumId?: number;
}

AlbumList_Album.init(
    {},
    {
        sequelize,
        modelName: "AlbumList_Album",
        freezeTableName: true,
    }
);

AlbumList_Album.sync();

AlbumList.belongsToMany(Album, {
    through: AlbumList_Album,
    as: "albums",
    foreignKey: "albumListId",
    otherKey: "albumId",
});

Album.belongsToMany(AlbumList, {
    through: AlbumList_Album,
    as: "albumLists",
    foreignKey: "albumId",
    otherKey: "albumListId",
});



export default AlbumList_Album;
