const router = require("express").Router();
const { getPosts , getOnePost , likePost , savePost} = require('../../Controllers/Website/postHandler');
const {decodeCustomerToken,  addCustomerIdToRequest} = require('../../middlewares/middleware') 
router.get('/' , addCustomerIdToRequest, getPosts)
router.get('/:id' , getOnePost)
router.post('/:postId/like', addCustomerIdToRequest, likePost);
router.post('/:postId/save',decodeCustomerToken, savePost);

module.exports = {
  postClientRouter: router
};
