const { Op } = require("sequelize");
const { InstagramPost  , InstagramPostImage , LikePost, SavedPost,} = require('../../models/post');

const getPosts = async (req, res) => {
  try {
    
    const { page, limit = 10 } = req.query; 
    const userCondition = req?.user ? { customer_id: req?.user?.customerId } : { customer_id: null };
    const offset = (page - 1) * limit;

    // Query the posts with additional attributes for likes and saves
    const posts = await InstagramPost.findAll({
      include: [
        {
          model: InstagramPostImage,
          attributes: ['id', 'url'],
        },
        {
          model: LikePost,
          attributes: ['is_active'], // You can specify attributes if needed
          where: {
            is_active: 1, // Check if the like is active
            ...userCondition
          },
          required: false, // Use left join to include liked posts
          as: 'isLiked', 
          // Specify the alias here
        },
        {
          model: SavedPost,
          attributes: ['is_active'], // You can specify attributes if needed
          where: {
            is_active: 1, // Check if the save is active
            ...userCondition
          },
          required: false, // Use left join to include saved posts
          as: 'isSaved', // Specify the alias here
        },
      ],
      order: [['created_at', 'DESC']],
      where: {
        deleted_at: {
          [Op.eq]: 0,
        },
      },
      limit,
      offset,
      attributes: [
        'id',
        'caption',
        'created_at',
        'updated_at',
        'likes', // Include the likes count from the InstagramPost model
      ],
    });

    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to get posts' });
  }
};

  
// handler to get a specific Instagram post by ID
const getOnePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await InstagramPost.findByPk(id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to get post' });
  }
};

const likePost = async (req, res) => {
  try {
    const  postId  = +req.params.postId;
    const customerId = req?.user?.customerId || null; // Assuming you have user information in the request
    if (!customerId) {
      const post = await InstagramPost.findByPk(postId);
      if (post) {
        post.likes = post.likes + 1
      await post.save();
      res.json({ message: 'Post liked/unliked successfully without login'});
      return;
     }
    }
    // Find the user's like for the post, if it exists
    let userLike = await LikePost.findOne({
      where: { customer_id: customerId, post_id: postId },
    });

    if (userLike) {
      // User has already liked the post, so toggle the is_active flag
      userLike.is_active = userLike.is_active === 1 ? 0 : 1;
      await userLike.save();
    } else {
      // If the user hasn't liked the post, create a new like
      userLike = await LikePost.create({ customer_id: customerId, post_id: postId, is_active: 1 });
    }

    // Update the like count in the InstagramPost model
    const post = await InstagramPost.findByPk(postId);
    if (post) {
      post.likes = await LikePost.count({
        where: { post_id: postId, is_active: 1 },
      });
      await post.save();
    }

    res.json({ message: 'Post liked/unliked successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to like/unlike the post' });
  }
};

const savePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const customerId = req?.user?.customerId || null; // Assuming you have user information in the request
    if (!customerId) {
      res.status(401);      
      res.send({
        data: {
          message: 'لطفا وارد شوید.'
        }
      })
    }
    // Find the user's saved post, if it exists
    let userSavedPost = await SavedPost.findOne({
      where: { customer_id: customerId, post_id: postId },
    });

    if (userSavedPost) {
      // User has already saved the post, so toggle the is_active flag
      userSavedPost.is_active = userSavedPost.is_active === 1 ? 0 : 1;
      await userSavedPost.save();
    } else {
      // If the user hasn't saved the post, create a new saved post
      userSavedPost = await SavedPost.create({ customer_id: customerId, post_id: postId, is_active: 1 });
    }

    res.json({ message: 'Post saved/unsaved successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to save/unsave the post' });
  }
};

const getCustomerSavedPosts = async (req, res) => {
  try {
    const { page, limit = 10 } = req.query; // Assuming you have a userId parameter
    const {customerId} = req.user; 
    console.log(customerId);
    const offset = (page - 1) * limit;
    // Query the saved posts for the user with pagination
    const savedPosts = await SavedPost.findAll({
      where: {
        customer_id: customerId,
        is_active: 1, // Check if the save is active
      },
      include: [
        {
          model: InstagramPost,
          attributes: [
            'id',
            'caption',
            'created_at',
            'updated_at',
            'likes', // Include the likes count from the InstagramPost model
          ],
          include: [
            {
              model: InstagramPostImage,
              attributes: ['id', 'url'],
            },
          ],
          as : 'Post'
        }
      ],
      // order: [['created_at', 'DESC']]
      // limit, // Apply the limit
      // offset, // Apply the offset
    });

    res.send({
      data : {
        savedPosts
      } 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to get saved posts' });
  }
};

module.exports = {
  getPosts,
  getOnePost,
  likePost, 
  savePost,
  getCustomerSavedPosts
};
