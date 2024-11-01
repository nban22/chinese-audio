"use strict";
import {
    Model,
    DataTypes,
    Sequelize,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional
} from "sequelize";

export class User extends Model<
    InferAttributes<User>, // Define attributes that User has
    InferCreationAttributes<User> // Define attributes needed for instance creation
> {
    // Define attributes with optional fields
    declare id: CreationOptional<number>; // Optional because Sequelize auto-generates it
    declare name: string;
    declare username: string;
    declare password: string;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: { [key: string]: Model<any, any> }) {
        // Define associations here
        // Example: this.hasMany(models.Post);
    }
}

// Initialize the model with attributes and options
const initUserModel = (sequelize: Sequelize) => {
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            
        },
        {
            sequelize, // Sequelize instance
            modelName: "User", // Model name
            // tableName: "user", // Table name in DB (optional)
            timestamps: true, // Adds createdAt and updatedAt fields
            freezeTableName: true,

        }
    );

    User.sync();

    return User;
};

export default initUserModel;
