const router = require("express").Router();
const { getCustomerSavedPosts } = require("../../../Controllers/Website/postHandler");

router.get('/' , getCustomerSavedPosts);

module.exports = {
    profilePosts : router
}