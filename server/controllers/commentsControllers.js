const { addComment } = require("../services/commentsServices");

const createComment = async (req, res, next) => {
  try {
    const { comment, userId } = req.body;
    const { sitterId } = req.params;
    const sitter = await addComment(comment, userId, sitterId);
    res.status(201).json(sitter);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createComment,
};
