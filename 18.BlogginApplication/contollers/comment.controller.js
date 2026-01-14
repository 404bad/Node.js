import { Comment } from "../models/comment.model.js";

export const addCommentController = async (req, res) => {
  const comment = await Comment.create({
    blogId: req.params.blogId,
    content: req.body.content,
    createdBy: req.user._id,
  });
  return res.redirect(`/blogs/${req.params.blogId}`);
};
