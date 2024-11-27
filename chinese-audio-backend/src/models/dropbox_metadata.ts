'use strict';
import {
  Model,
  DataTypes
} from 'sequelize';
import sequelize from './connection';
export interface Dropbox_MetadataAttributes {
  dropbox_path: string;
  url: string;
  title: string;
}
class Dropbox_Metadata extends Model < Dropbox_MetadataAttributes > implements Dropbox_MetadataAttributes {
  dropbox_path!: string;
  url!: string;
  title!: string;
}
Dropbox_Metadata.init({
  dropbox_path: DataTypes.STRING,
  url: DataTypes.STRING,
  title: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Dropbox_Metadata',
  freezeTableName: true
});
// Associations
// Dropbox_Metadata.belongsTo(TargetModel, {
//   as: 'custom_name',
//   foreignKey: {
//     name: 'foreign_key_column_name',
//     allowNull: false,
//   },
//   onDelete: "RESTRICT",
//   foreignKeyConstraint: true,
// });
export default Dropbox_Metadata;