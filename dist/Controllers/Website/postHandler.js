var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { Op } = require("sequelize");
const { InstagramPost, InstagramPostImage } = require('../../../models/post');
const getPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { page, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        const posts = yield InstagramPost.findAll({
            include: [
                {
                    model: InstagramPostImage,
                    attributes: ['id', 'url'],
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
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get posts' });
    }
});
// handler to get a specific Instagram post by ID
const getOnePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const post = yield InstagramPost.findByPk(id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get post' });
    }
});
module.exports = {
    getPosts,
    getOnePost
};
//# sourceMappingURL=postHandler.js.map