"use strict";
import { Model, DataTypes } from "sequelize";
import sequelize from "./connection";
import Album from "./album";
import Album_Audio from "./album_audio";
export interface AudioAttributes {
    id?: string;
    title: string;
    description: string;
    playCount?: number;
    likeCount?: number;
    isPublic?: boolean;
    duration?: number;
    fileName: string;
    size: number;
    originalFileName: string;
    url: string;
    createdAt?: Date;
    updatedAt?: Date;
    dropboxPath?: string;
}
class Audio extends Model<AudioAttributes> implements AudioAttributes {
    id!: string;
    title!: string;
    description!: string;
    playCount!: number;
    likeCount!: number;
    isPublic!: boolean;
    duration!: number;
    fileName!: string;
    size!: number;
    originalFileName!: string;
    url!: string;
    createdAt!: Date;
    updatedAt!: Date;
    dropboxPath!: string;
}
Audio.init(
    {
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
    },
    {
        sequelize,
        modelName: "Audio",
        freezeTableName: true,
    }
);

Audio.sync();

// Associations
// Audio.belongsTo(TargetModel, {
//   as: 'custom_name',
//   foreignKey: {
//     name: 'foreign_key_column_name',
//     allowNull: false,
//   },
//   onDelete: "RESTRICT",
//   foreignKeyConstraint: true,
// });

export default Audio;
