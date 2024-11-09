'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';
import sequelize from './connection';
export interface Album_AudioAttributes {
  albumId: number;
  audioId: number;
}
class Album_Audio extends Model < Album_AudioAttributes > implements Album_AudioAttributes {
  albumId!: number;
  audioId!: number;
}
Album_Audio.init({
  albumId: DataTypes.INTEGER,
  audioId: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'Album_Audio',
  freezeTableName: true
});

Album_Audio.sync();
// Associations


export default Album_Audio;