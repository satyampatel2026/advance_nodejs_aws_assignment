const logger =require("../utils/logger");
const { randomUUID } = require("crypto");

 const requestLogger = (req, res, next) => {
  const start = Date.now();

  req.requestId = randomUUID();

 res.on("finish", () => {
    logger.info("HTTP Request Log", {
      timestamp: new Date().toISOString(),
      level: "info",
      requestId: req.requestId,
      userId: req.user?.id || null,
      route: req.originalUrl,
      method: req.method,
      statusCode: res.statusCode,
      duration: `${Date.now() - start}ms`,
    });
  });

  next();
};

module.exports={requestLogger};