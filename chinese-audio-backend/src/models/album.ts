"use strict";
import {
    Model,
    DataTypes,
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
} from "sequelize";
import sequelize from "./connection";
import Image from "./image";

class Album extends Model<InferAttributes<Album>, InferCreationAttributes<Album>> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare description: CreationOptional<string>;
    declare avatar: CreationOptional<string>;
    declare releaseDate: CreationOptional<Date>;
    declare isPublic: CreationOptional<boolean>;

    public image?: Image;
}
Album.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            defaultValue: null,
        },
        avatar: {
            type: DataTypes.TEXT,
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

export default Album;
