const express = require("express");
const { createReport ,getAllReports} = require("../controllers/ReportController");
const router = express.Router();

router.post("/create-Report",createReport);
router.get("/getAllReports",getAllReports)

module.exports = router;