'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';
import sequelize from './connection';

export interface AlbumList_AlbumAttributes {
  albumListId: number;
  albumId: number;
}
class AlbumList_Album extends Model < AlbumList_AlbumAttributes > implements AlbumList_AlbumAttributes {
  albumListId!: number;
  albumId!: number;
}
AlbumList_Album.init({
  albumListId: DataTypes.INTEGER,
  albumId: {
    type: DataTypes.INTEGER
  }
}, {
  sequelize,
  modelName: 'AlbumList_Album',
  freezeTableName: true
});

AlbumList_Album.sync();

export default AlbumList_Album;