const router = require("express").Router();
const multer = require('multer');
const { uploadPost } = require('../../Controllers/Dashboard/postHandler');

// configure multer for uploading files
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/' , upload.array('images', 10) , uploadPost);

module.exports = {
    postDashboardRouter : router
}