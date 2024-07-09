const asyncHandler = require("express-async-handler");
const Report = require("../models/report");

const createReport = asyncHandler(async (req, res) => {
  try {
    const { user, issueTitle, priority, location, description, image } =req.body; 
    const newReport = new Report({
      user,
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
    res.status(500).json({ error: 'Internal server error' });
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
  