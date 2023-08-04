const router = require('express').Router();
const { registerOrLogin , verify} = require('../../Controllers/auth/clientAuth')

router.post('/signin', registerOrLogin);
router.post('/signin/verify', verify);

module.exports = {
    clientAuthRouter : router
}