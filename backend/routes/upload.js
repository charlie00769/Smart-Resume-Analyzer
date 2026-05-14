const express = require("express");
const multer = require("multer");

const analyzeResume = require("../utils/analyzeResume");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const result = await analyzeResume(req.file.path);

    res.json({
      message: "Resume analyzed successfully",
      analysis: result,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Analysis failed",
    });
  }
});

module.exports = router;