'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';
import sequelize from './connection';
import AlbumList from './albumlist';
import Audio from './audio';
import AlbumList_Album from './albumlist_album';
import Album_Audio from './album_audio';

export interface AlbumAttributes {
  title: string;
  description: string;
  avatar: any;
  releaseDate: Date;
  isPublic: boolean;
}
class Album extends Model < AlbumAttributes > implements AlbumAttributes {
  title!: string;
  description!: string;
  avatar!: any;
  releaseDate!: Date;
  isPublic!: boolean;
}
Album.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.STRING,
  avatar: {
    type: DataTypes.BLOB,
    defaultValue: null
  },
  releaseDate: DataTypes.DATE,
  isPublic: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  sequelize,
  modelName: 'Album',
  freezeTableName: true
});

Album.sync();

Album.belongsToMany(AlbumList, {
    through: AlbumList_Album,
    as: 'albumLists',
    foreignKey: 'albumId',
    otherKey: 'albumListId'
})
Album.belongsToMany(Audio, {
    through: Album_Audio,
    as: 'audios',
    foreignKey: 'albumId',
    otherKey: 'audioId'
})
export default Album;