const requireUser = require('../middlewares/requireUser');
const UserController = require('../controllers/userController');
const router = require('express').Router();

router.post('/follow', requireUser, UserController.followOrUnfollowUserController);
router.get('/getPostsOfFollowing', requireUser, UserController.getPostsOfFollowing);
router.get('/getMyPosts', requireUser, UserController.getMyPosts);
router.get('/getUserPosts', requireUser, UserController.getUserPosts);
router.delete('/', requireUser, UserController.deleteMyProfile);

module.exports = router;