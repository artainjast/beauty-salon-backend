// const Post = sequelize.define('mariNail_Post', {
//   imageUrl: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   caption: {
//     type: DataTypes.STRING,
//     allowNull: false
//   }
// });


// module.exports = {
//   postModel: Post
// };

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../Config/DBconfig');


class InstagramPost extends Model {}

InstagramPost.init(
  {
    caption: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: false,
    },
    created_at: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: Math.floor(Date.now() / 1000)
    },
    updated_at: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: Math.floor(Date.now() / 1000)
    },
    deleted_at: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'mariNail_Post'
  }
);

class InstagramPostImage extends Model {}

InstagramPostImage.init(
  {
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    post_id:{
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: false,
    sequelize,
    modelName: 'mariNail_PostImage',
  }
);

InstagramPost.hasMany(InstagramPostImage, { foreignKey: 'post_id' });
InstagramPostImage.belongsTo(InstagramPost , { as: 'PostImages'});


module.exports = { InstagramPost, InstagramPostImage };
