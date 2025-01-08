"use strict";
import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes, ENUM } from "sequelize";
import sequelize from "./connection";
import bcrypt from "bcrypt"

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare username: string;
    declare email: string;
    declare googleId: CreationOptional<string>;
    declare facebookId: CreationOptional<string>;
    declare password: CreationOptional<string>;
    declare passwordResetToken: CreationOptional<string>;
    declare passwordResetTokenExpires: CreationOptional<Date>;
    declare passwordChangedAt: CreationOptional<Date>;
    declare role: CreationOptional<string>;
    declare loginMethod: CreationOptional<string>;
    declare avatar: CreationOptional<string>;
    declare active: CreationOptional<boolean>;
    declare readonly createdAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;

    public correctPassword = async (candidatePassword: string) => {
        return await bcrypt.compare(candidatePassword, this.password || "");
    }
}
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        googleId: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        facebookId: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        password: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        passwordResetToken: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        passwordResetTokenExpires: {
            type: DataTypes.DATE,
            defaultValue: null,
        },
        passwordChangedAt: {
            type: DataTypes.DATE,
            defaultValue: null,
        },
        role: {
            type: ENUM("admin", "user"),
            defaultValue: "user",
        },
        loginMethod: {
            type: ENUM("local", "google", "facebook"),
            defaultValue: "local",
        },
        avatar: {
            type: DataTypes.TEXT,
            defaultValue: null,
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        modelName: "User",
        freezeTableName: true,
        timestamps: true,
        hooks: {
            // Hash the password before creating a user
            beforeCreate: async (user: User) => {
                if (user.password) {
                    user.password = await bcrypt.hash(user.password, 10); // Hash the password
                }
            },
            // Hash the password before updating the user
            beforeUpdate: async (user: User) => {
                if (user.password && user.changed('password')) {
                    user.password = await bcrypt.hash(user.password, 10); // Hash the password
                }
            }
        }

    }
);

export default User;