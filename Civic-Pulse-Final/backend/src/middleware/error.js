function notFound(req, res) {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
}

function errorHandler(error, req, res, next) {
  console.error(error);

  if (error.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({
      message: "Uploaded image is too large. Maximum size is 8 MB."
    });
  }

  if (error.message === "Only image files are allowed.") {
    return res.status(400).json({
      message: error.message
    });
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed.",
      errors: Object.fromEntries(
        Object.entries(error.errors).map(([key, value]) => [
          key,
          value.message
        ])
      )
    });
  }

  if (error.code === 11000) {
    return res.status(409).json({
      message: "A record with that unique value already exists."
    });
  }

  res.status(500).json({
    message: "Internal server error."
  });
}

module.exports = { notFound, errorHandler };
