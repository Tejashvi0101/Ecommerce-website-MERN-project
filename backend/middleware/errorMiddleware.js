const notFound = (req, res, next) => {
  // 1) Set CORS header
  res.set('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
  // 2) Then continue with your 404 logic
  const error = new Error(`Not Found – ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  // 1) Ensure CORS on every error response
  res.set('Access-Control-Allow-Origin', process.env.FRONTEND_URL);

  // 2) Your existing logic
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    // hide stack in production
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };
