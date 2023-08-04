const { Op } = require("sequelize");
const { InstagramPost  , InstagramPostImage} = require('../../models/post');

const getPosts = async (req, res) => {
    try {
      const { page, limit = 10 } = req.query;
      const offset = (page - 1) * limit;
      const posts = await InstagramPost.findAll({
        include: [
          {
            model: InstagramPostImage,
            attributes: ['id' , 'url'],
          }
        ],
        order: [['created_at', 'DESC']],
        where: {
                deleted_at: {
                    [Op.eq]: 0,
                },
            },
        limit,
        offset
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

module.exports = {
  getPosts,
  getOnePost
};
