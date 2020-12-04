const router = require('express').Router();
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');

router.post('/', userController.createUser);
router.get('/', auth.authAdmin, userController.getAllUser);
router.delete('/:userId', auth.authAdmin, userController.delete);
router.post('/refreshUser/:userId', auth.authAdmin, userController.refreshUser);

router.put('/:userId', auth.authUser, userController.updateUser);
router.get('/:userId', auth.authUser, userController.getUser);
router.post('/changePass', auth.authUser, userController.changePass);

router.post('/login', userController.login);

// permissions
router.post('/permissions/:userId', auth.authAdmin, userController.addPermission);

router.post('/delete-permissions/:userId', auth.authAdmin, userController.deletePermission);

module.exports = router;
