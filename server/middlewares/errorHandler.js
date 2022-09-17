exports.errorHandler = (err, req, res, next) => {
  if (err.name === "Authentication Error") {
    res.status(403).json({ message: err.message });
  }
};
