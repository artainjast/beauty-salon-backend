const { DataTypes } = require("sequelize");
const db = require("../Config/DBconfig");




const InstagramPost = db.define(
  'mariNail_Posts',
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
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
  },
  {
    timestamps: false
  }
);

const InstagramPostImage = db.define(
  'mariNail_PostImage',
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
    timestamps: false
  }
)
const LikePost = db.define(
  'mariNail_LikesPosts',
  {
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.TINYINT,
      allowNull: false,
      default : 1
    } 
  },
  {
    timestamps: false
  }
);

const SavedPost = db.define(
  'mariNail_SavedPosts',
  {
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.TINYINT,
      allowNull: false,
      default : 1
    } 

    
  },
  {
    timestamps: false
  }
);

InstagramPost.hasMany(LikePost, {
  foreignKey: 'post_id',
  as: 'isLiked' // Alias for the association with likes
});

LikePost.belongsTo(InstagramPost, {
  foreignKey: 'post_id',
  as: 'Post' // Alias for the association with posts
});

InstagramPost.hasMany(SavedPost, {
  foreignKey: 'post_id',
  as: 'isSaved' // Alias for the association with saves
});

SavedPost.belongsTo(InstagramPost, {
  foreignKey: 'post_id',
  as: 'Post' // Alias for the association with posts
});
InstagramPost.hasMany(InstagramPostImage, { foreignKey: 'post_id' });
InstagramPostImage.belongsTo(InstagramPost , { as: 'PostImages'});


module.exports = { InstagramPost, InstagramPostImage , SavedPost , LikePost };
