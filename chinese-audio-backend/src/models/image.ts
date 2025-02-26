"use strict";
import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import sequelize from "./connection";

class Image extends Model<InferAttributes<Image>, InferCreationAttributes<Image>> {
    declare id: CreationOptional<number>;
    declare url: string;
    declare dropboxPath: CreationOptional<string>;
    declare fileName: CreationOptional<string>;
    declare ownerId: CreationOptional<number>;
    declare ownerType: CreationOptional<string>;
    
    declare readonly createdAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;
}
Image.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dropboxPath: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        fileName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ownerType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        modelName: "Image",
        freezeTableName: true,
        timestamps: true,
    }
);

export default Image;