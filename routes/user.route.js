const router = require('express').Router();
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');

router.post('/', auth, userController.createUser);
router.get('/', auth, userController.getAllUser);
router.put('/:userId', auth, userController.updateUser);
router.get('/:userId', auth, userController.getUser);
router.post('/login', auth, userController.login);

module.exports = router;
