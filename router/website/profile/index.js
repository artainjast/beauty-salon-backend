const router = require('express').Router();
const { authenticateClientJWT } = require('../../../middlewares/middleware');
const { receptionClientRouter } = require('./reception');
const { profilePosts } = require('./post');



router.use('/reception', authenticateClientJWT , receptionClientRouter)
router.use('/posts', authenticateClientJWT , profilePosts)

module.exports = {
    profileRouter : router
}
