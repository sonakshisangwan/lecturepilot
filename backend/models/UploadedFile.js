const mongoose = require("mongoose");

const uploadedFileSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    url: { type: String, required: true },
    public_id: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number },
    text: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UploadedFile", uploadedFileSchema);