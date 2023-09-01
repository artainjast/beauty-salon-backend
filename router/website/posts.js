const router = require("express").Router();
const { getPosts , getOnePost , likePost , savePost} = require('../../Controllers/Website/postHandler');
const {decodeCustomerToken} = require('../../middlewares/middleware') 
router.get('/' , decodeCustomerToken, getPosts)
router.get('/:id' , getOnePost)
router.post('/:postId/like', decodeCustomerToken, likePost);
router.post('/:postId/save',decodeCustomerToken, savePost);

module.exports = {
  postClientRouter: router
};
