const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage }).single('file');

// Ruta de carga
router.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: "Error uploading file", details: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    res.status(200).json({ fileUrl: `/public/${req.file.filename}` });
  });
});

module.exports = router;
