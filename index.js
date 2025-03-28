const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/ocr', upload.single('file'), async (req, res) => {
  const imagePath = req.file.path;
  try {
    const result = await Tesseract.recognize(imagePath, 'eng');
    fs.unlinkSync(imagePath);
    res.json({ text: result.data.text });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/', (req, res) => {
  res.send('OCR API is running!');
});

app.listen(3000, () => console.log('🟢 OCR API running on port 3000'));
