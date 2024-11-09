'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';
import sequelize from './connection';
import Album from './album';
import AlbumList_Album from './albumlist_album';
export interface AlbumListAttributes {
  title: string;
}
class AlbumList extends Model < AlbumListAttributes > implements AlbumListAttributes {
  title!: string;
}
AlbumList.init({
  title: DataTypes.STRING
}, {
  sequelize,
  modelName: 'AlbumList',
  freezeTableName: true
});

AlbumList.sync();

// Associations
// AlbumList.belongsTo(TargetModel, {
//   as: 'custom_name',
//   foreignKey: {
//     name: 'foreign_key_column_name',
//     allowNull: false,
//   },
//   onDelete: "RESTRICT",
//   foreignKeyConstraint: true,
// });
AlbumList.belongsToMany(Album, {
  through: AlbumList_Album,
  as: 'albums',
  foreignKey: 'albumListId',
  otherKey: 'albumId'
})
export default AlbumList;