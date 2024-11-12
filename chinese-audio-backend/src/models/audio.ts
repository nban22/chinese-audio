'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';
import sequelize from './connection';
import Album from './album';
import Album_Audio from './album_audio';
export interface AudioAttributes {
  id?: string;
  title: string;
  description: string;
  file: any;
  playCount: number;
  likeCount: number;
  isPublic: boolean;
  duration: number;
  fileName: string;
}
class Audio extends Model < AudioAttributes > implements AudioAttributes {
  id?: string;
  title!: string;
  description!: string;
  file!: any;
  playCount!: number;
  likeCount!: number;
  isPublic!: boolean;
  duration!: number;
  fileName!: string;
}
Audio.init({
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  file: DataTypes.BLOB('long'),
  playCount: DataTypes.INTEGER,
  likeCount: DataTypes.INTEGER,
  isPublic: DataTypes.BOOLEAN,
  duration: DataTypes.INTEGER,
  fileName: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Audio',
  freezeTableName: true
});

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