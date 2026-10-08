const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const { uploadFile, getUploadedFiles } = require("../controllers/uploadController");

router.post("/", upload.single("file"), uploadFile);
router.get("/", getUploadedFiles);

module.exports = router;