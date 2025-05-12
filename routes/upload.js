// uploadRoutes.js
import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

// uploads/ klasörüne atar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "Resim eksik" });
  const imagePath = `/uploads/${req.file.filename}`;
  res.status(201).json({ imageUrl: imagePath });
});

export default router;
