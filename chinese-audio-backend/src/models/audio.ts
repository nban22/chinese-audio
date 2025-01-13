"use strict";
import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import sequelize from "./connection";

class Audio extends Model<InferAttributes<Audio>, InferCreationAttributes<Audio>> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare description: CreationOptional<string>;
    declare playCount: CreationOptional<number>;
    declare likeCount: CreationOptional<number>;
    declare isPublic: CreationOptional<boolean>;
    declare duration: CreationOptional<number>;
    declare fileName: string;
    declare size: number;
    declare originalFileName: string;
    declare url: string;
    declare dropboxPath: string;
    declare uploadDate: CreationOptional<Date>;
    declare updateDate: CreationOptional<Date>;
}
Audio.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        playCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        likeCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        isPublic: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        duration: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        fileName: DataTypes.STRING,
        size: DataTypes.INTEGER,
        originalFileName: DataTypes.STRING,
        url: DataTypes.STRING,
        dropboxPath: DataTypes.STRING,
        uploadDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updateDate: {
            type: DataTypes.DATE,
            defaultValue: null,
        },
    },
    {
        sequelize: sequelize,
        modelName: "Audio",
        freezeTableName: true,
        timestamps: true,
    }
);

Audio.sync();

export default Audio;
