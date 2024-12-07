"use strict";
import {
    Model,
    DataTypes,
    BelongsToManyAddAssociationMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyRemoveAssociationMixin,
    NonAttribute,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";
import sequelize from "./connection";

class Series extends Model<InferAttributes<Series>, InferCreationAttributes<Series>> {
    declare id: CreationOptional<number>;
    declare title: string;
}
Series.init(
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
    },
    {
        sequelize,
        modelName: "Series",
        freezeTableName: true,
        timestamps: true,
    }
);

export default Series;
