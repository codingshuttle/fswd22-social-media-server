const mapPostOutput = (post, userId) => {
    return {
        _id: post._id,
        caption: post.caption,
        image: post.image,
        owner: {
            _id: post.owner._id,
            name: post.owner.name,
            avatar: post.owner.avatar
        },
        likesCount: post.likes.length,
        isLiked: post.likes.includes(userId)
    }
}

module.exports = {
    mapPostOutput
}