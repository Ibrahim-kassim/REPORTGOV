const asyncHandler = require("express-async-handler");
const Report = require("../models/report");

const createReport = asyncHandler(async (req, res) => {
  try {
    const { issueTitle, priority, location, description } = req.body;
    
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    
    const userId = req.user._id;

    let image = null;
    if (req.file) {
      image = req.file.path;
    }

    const newReport = new Report({
      user: userId,
      issueTitle,
      priority,
      location,
      description,
      image,
    });

    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

const getAllReports = asyncHandler(async(req,res)=>{
    try {
        const reports = await Report.find()
        res.status(201).json(reports)
        
    } catch (error) {
        res.status(501).json("no reports in database" , error)
        
    }
})

module.exports = {
    createReport,
    getAllReports
};