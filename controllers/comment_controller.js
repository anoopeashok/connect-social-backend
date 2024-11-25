
const Comment = require('../models/comment_model')
const Post = require('../models/post_model')
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

const createComment = async (req, res) => {
    const { text, replytoId, postId } = req.body
    const { user } = req
    
    const post = await Post.findById(postId)
    if (!post) {
        throw new CustomError.NotFound('Post not found')
    }
    const comment = await Comment.create({ comment: text, post: post._id, author: user.profile });
    
    if (replytoId) { 
        const replyComment = await Comment.findById(replytoId);
        replyComment.reply.push(comment._id)
        await replyComment.save()
    }
    post.commentCount = post.commentCount + 1
    await post.save()
    res.status(StatusCodes.OK).json({'msg':'success'})

}

const deleteComment = async (req, res) => {
    const { user, params } = req
    const { postId } = req.body
    const post = await Post.findById(postId)
    const comment = await Comment.findOneAndDelete({_id:params.id,author:user.profile})
    if (!comment) {
        throw CustomError.NotFound('Comment not found')
    }
    if (!comment.reply) {
        await comment.deleteMany({ _id: {$in:comment.reply} })
    }
    post.commentCount = post.commentCount - 1;
    await post.save()
    res.status(StatusCodes.OK).json({'msg':'success'})
}

module.exports = {createComment,deleteComment}