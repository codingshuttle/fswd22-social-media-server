const requireUser = require('../middlewares/requireUser');
const UserController = require('../controllers/userController');
const router = require('express').Router();

router.post('/follow', requireUser, UserController.followOrUnfollowUserController);
router.get('/getPostsOfFollowing', requireUser, UserController.getPostsOfFollowing);

module.exports = router;