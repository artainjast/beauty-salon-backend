const router = require("express").Router();
const { getPosts, getOnePost } = require('../../Controllers/Website/postHandler');
router.get('/', getPosts);
router.get('/:id', getOnePost);
module.exports = {
    postClientRouter: router
};
//# sourceMappingURL=posts.js.map