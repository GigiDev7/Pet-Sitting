exports.errorHandler = (err, req, res, next) => {
  if (err.name === "Authentication Error") {
    res.status(401).json({ message: err.message });
  } else if (err.name === "Validation Error") {
    res.status(400).json({ message: err.message });
  } else if (err.name === "Authorization Error") {
    res.status(403).json({ message: err.message });
  } else if (err.code === 11000) {
    res.status(400).json({ message: "Email already exists" });
  } else {
    res.status(500).json(err);
  }
};
