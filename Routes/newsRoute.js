const express = require('express');
const router = express.Router();

const isAdmin = require('../middlewares/isAdmin');
const { createNews, DeleteNews, getAllNews } = require('../controllers/newsController');
const { protect } = require('../middlewares/authMiddleWare');

router.post('/addNews',protect, isAdmin, createNews);
router.delete("/deleteNews/:id",protect,isAdmin,DeleteNews)
router.get("/getAllNews",getAllNews)

module.exports = router;
