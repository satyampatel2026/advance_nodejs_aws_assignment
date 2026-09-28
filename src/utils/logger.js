const winston =require('winston');
const WinstonCloudWatch = require("winston-cloudwatch");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
      new WinstonCloudWatch({
      logGroupName: "/document-platform",
      logStreamName: "application-logs",
      awsRegion: process.env.AWS_REGION,
      awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
      awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }),
  ],
});

module.exports=logger;