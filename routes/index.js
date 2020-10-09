const router = require('express').Router();
const reportRoute = require('./reports.route');
const userRoute = require('./user.route');
const commonController = require('../controllers/common.controller');
const auth = require('../middlewares/auth');

router.use('/reports', auth, reportRoute);
router.use('/user', userRoute);

router.get('/get-game', commonController.getAllGame);

router.post('/insert', commonController.importData);

module.exports = router;
