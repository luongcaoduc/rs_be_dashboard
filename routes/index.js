const router = require('express').Router();
const multer = require('multer');
const reportRoute = require('./reports.route');
const userRoute = require('./user.route');
const commonController = require('../controllers/common.controller');
const auth = require('../middlewares/auth');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}.xlsx`);
  },
});

const upload = multer({ storage });

router.use('/reports', auth.authUser, reportRoute);
router.use('/user', userRoute);

router.get('/get-game', auth.authUser, commonController.getAllGame);

router.post('/insert', upload.single('datafile'), commonController.importData);
router.post('/import-data', upload.single('datafile'), commonController.importData);
router.post('/import-data2', upload.single('datafile'), commonController.importData2);
router.post('/export-data', commonController.exportData);
router.get('/craw-data', commonController.crawData);
router.get('/test', (req, res) => {
  res.send('hello');
});

module.exports = router;
