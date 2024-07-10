const express = require("express");
const { createReport, getAllReports } = require("../controllers/ReportController");
const { protect } = require("../middlewares/authMiddleWare");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post("/create-Report", protect, upload.single('image'), createReport);
router.get("/getAllReports", getAllReports);

module.exports = router;