//this will give us information about each incoming request by logging the date and
const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  if (!req.path.startsWith("/.well-known")) {
    console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  }
  next();
};

module.exports = logRoutes;
