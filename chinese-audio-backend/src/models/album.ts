"use strict";
import {
    Model,
    DataTypes,
    BelongsToManyAddAssociationMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyRemoveAssociationMixin,
    NonAttribute,
} from "sequelize";
import sequelize from "./connection";
import AlbumList from "./albumlist";

export interface AlbumAttributes {
    title: string;
    description: string;
    avatar: any;
    releaseDate: Date;
    isPublic: boolean;
}
class Album extends Model<AlbumAttributes> implements AlbumAttributes {
    title!: string;
    description!: string;
    avatar!: any;
    releaseDate!: Date;
    isPublic!: boolean;

    // Các phương thức quản lý quan hệ nhiều-nhiều với AlbumList
    public addAlbumList!: BelongsToManyAddAssociationMixin<AlbumList, number>;
    public getAlbumLists!: BelongsToManyGetAssociationsMixin<AlbumList>;
    public removeAlbumList!: BelongsToManyRemoveAssociationMixin<AlbumList, number>;

    // Thuộc tính để chứa danh sách albumLists khi sử dụng include
    public readonly albumLists?: NonAttribute<AlbumList[]>;

    public static associate() {
        Album.belongsToMany(AlbumList, {
            through: "AlbumAlbumList", // Tên bảng trung gian
            as: "albumLists", // Alias cho quan hệ
            foreignKey: "albumId",
        });
    }
}
Album.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: DataTypes.STRING,
        avatar: {
            type: DataTypes.BLOB,
            defaultValue: null,
        },
        releaseDate: DataTypes.DATE,
        isPublic: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        sequelize,
        modelName: "Album",
        freezeTableName: true,
    }
);

Album.sync();

export default Album;
