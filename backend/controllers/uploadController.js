const cloudinary = require("../config/cloudinary");
const UploadedFile = require("../models/UploadedFile");
const extractTextFromPDF = require("../utils/extractText");

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const file = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
      folder: "lecturepilot",
    });

    let extractedText = "";

    if (req.file.mimetype === "application/pdf") {
      extractedText = await extractTextFromPDF(req.file.buffer);
    }

    const savedFile = await UploadedFile.create({
      filename: req.file.originalname,
      url: result.secure_url,
      public_id: result.public_id,
      mimetype: req.file.mimetype,
      size: req.file.size,
      text: extractedText,
    });

    res.status(200).json({
      success: true,
      url: savedFile.url,
      public_id: savedFile.public_id,
      file: savedFile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUploadedFiles = async (req, res) => {
  try {
    const files = await UploadedFile.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: files.length,
      files,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { uploadFile, getUploadedFiles };