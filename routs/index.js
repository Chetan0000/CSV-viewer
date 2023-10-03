const express = require('express');
const router = express.Router();
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

const homeController = require('../controllers/home_Controller')

router.get('/',homeController.home);
router.post('/upload', upload.single('file') ,homeController.upload);
router.get('/view/:id',homeController.view);
router.get('/delete/:id',homeController.destroy);




module.exports =router;