const Post = require("../models/Post");
const User = require("../models/User");
const { success, error } = require("../utils/responseWrapper");

const followOrUnfollowUserController = async (req, res) => {
    try {
        const { userIdToFollow } = req.body;
        const curUserId = req._id;

        const userToFollow = await User.findById(userIdToFollow);
        const curUser = await User.findById(curUserId);

        if(curUserId === userIdToFollow) {
            return res.send(error(409, 'Users cannot follow themselves'))
        }

        if (!userToFollow) {
            return res.send(error(404, "User to follow not found"));
        }

        if (curUser.followings.includes(userIdToFollow)) {
            // already followed
            const followingIndex = curUser.followings.indexOf(userIdToFollow);
            curUser.followings.splice(followingIndex, 1);

            const followerIndex = userToFollow.followers.indexOf(curUser);
            userToFollow.followers.splice(followerIndex, 1);

            await userToFollow.save();
            await curUser.save();

            return res.send(success(200, "User Unfollowed"));
        } else {
            userToFollow.followers.push(curUserId);
            curUser.followings.push(userIdToFollow);

            await userToFollow.save();
            await curUser.save();

            return res.send(success(200, "User Followed"));
        }
    } catch (e) {
        console.log(e);
        return res.send(error(500, e.message));
    }
};

const getPostsOfFollowing = async (req, res) => {
    try {
        const curUserId = req._id;
        const curUser = await User.findById(curUserId);
    
        const posts = await Post.find({
            'owner': {
                '$in': curUser.followings
            }
        })
    
        return res.send(success(200, posts)); 
    } catch (error) {
        console.log(e);
        return res.send(error(500, e.message));
    }
}

module.exports = {
    followOrUnfollowUserController,
    getPostsOfFollowing,
    // getMyPosts
    // getUserPosts 
    // deleteMyProfile
}

