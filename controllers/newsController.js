const asyncHandler = require('express-async-handler');
const News = require('../models/news');

// POST /api/news/add - Create a new news article (restricted to admin)
const createNews = asyncHandler(async (req, res) => {
    const { title, tag, description, image } = req.body;
    const userId = req.user._id; // Assuming userId is extracted from the authenticated user

    try {
        const news = await News.create({
            user: userId,
            title,
            tag,
            description,
            image,
        });

        res.status(201).json(news);
    } catch (error) {
        res.status(500).json({ error: "Failed to create news article" });
    }
});

const DeleteNews = asyncHandler(async(req,res)=>{
    const IdOfNewsToBeDeleted = req.params.id

    const deleteNew = await News.findByIdAndDelete(IdOfNewsToBeDeleted)


    if (deleteNew) {
        res.status(200).json({ message: "News article deleted successfully", data: deleteNew });
    } else {
        res.status(404);
        throw new Error("News article not found");
    }
    
    
})

const getAllNews = asyncHandler(async(req,res)=>{
   try {
    const news = await News.find()

    res.status(201).json(news)
    
   } catch (error) {
    res.status(501).json("no news found",error)
    
   }

})

module.exports = { createNews,DeleteNews,getAllNews };
