"use strict";
import {
    Model,
    DataTypes,
    Association,
    BelongsToManyAddAssociationMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyRemoveAssociationMixin,
    NonAttribute,
} from "sequelize";
import sequelize from "./connection";
import Album from "./album";
import AlbumList_Album from "./albumlist_album";
export interface AlbumListAttributes {
    title: string;
}
class AlbumList extends Model<AlbumListAttributes> implements AlbumListAttributes {
    title!: string;

    // Các phương thức quản lý quan hệ nhiều-nhiều với Album
    public addAlbum!: BelongsToManyAddAssociationMixin<Album, number>;
    public getAlbums!: BelongsToManyGetAssociationsMixin<Album>;
    public removeAlbum!: BelongsToManyRemoveAssociationMixin<Album, number>;

    // Thuộc tính để chứa danh sách albums khi sử dụng include
    public readonly albums?: NonAttribute<Album[]>;

    public static associate() {
        AlbumList.belongsToMany(Album, {
            through: "AlbumAlbumList", // Tên bảng trung gian
            as: "albums", // Alias cho quan hệ
            foreignKey: "albumListId",
        });
    }
}
AlbumList.init(
    {
        title: DataTypes.STRING,
    },
    {
        sequelize,
        modelName: "AlbumList",
        freezeTableName: true,
    }
);

export default AlbumList;
