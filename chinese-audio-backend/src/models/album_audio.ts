'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';
import sequelize from './connection';
import Album from './album';
import Audio from './audio';
export interface Album_AudioAttributes {
  albumId?: number;
  audioId?: number;
}
class Album_Audio extends Model < Album_AudioAttributes > implements Album_AudioAttributes {
  albumId?: number;
  audioId?: number;
}
Album_Audio.init({

}, {
  sequelize,
  modelName: 'Album_Audio',
  freezeTableName: true
});

Album_Audio.sync();
// Associations


Album.belongsToMany(Audio, {
  through: Album_Audio,
  as: 'audios',
  foreignKey: 'albumId',
  otherKey: 'audioId'
})

Audio.belongsToMany(Album, {
  through: Album_Audio,
  as: 'albums',
  foreignKey: 'audioId',
  otherKey: 'albumId'
})

export default Album_Audio;