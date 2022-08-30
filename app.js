const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = express();

//CLOUDINARY CONFIG
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'first-upload',
      allowedFormats: 'jpeg, png',
    };
  },
});

//MULTER SETUP
const upload = multer({ storage: storage });

//ROUTES
// app.get('/', (req, res) => {
//   res.status(200).send('page loaded successfully');
// });

app.post('/uploads', upload.single('photo'), async (req, res) => {
  res.status(200).json({
    status: 'success',
    // photo: req.file.
    photoUrl: req.file.path,
  });
});

//SERVER
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
