// const {CloudWatchLogsClient, CreateLogStreamCommand,PutLogEventsCommand}=require('@aws-sdk/client-cloudwatch-logs');
//  console.log("Logger file loaded successfully!");
// const cloudWatchClient=new CloudWatchLogsClient({
//     region: process.env.AWS_REGION,
//     credentials:{
//             accessKeyId:process.env.AWS_ACCESS_KEY_ID,
//             secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//         }
// });
// const logToCloudWatch=async(message)=>{
//     console.log("logToCloudWatch called with message:", message);
//     const logGroupName= process.env.AWS_CLOUDWATCH_LOG_GROUP
//     const logStreamName= process.env.AWS_CLOUDWATCH_LOG_STREAM
//     try{
//     try{
//     await cloudWatchClient.send( new CreateLogStreamCommand({ logGroupName,logStreamName  }) )
//     }catch(err){
//       if(err.name!=="ResourceAlreadyExistsException") throw err;
//     }
//     await cloudWatchClient.send(
//         new PutLogEventsCommand({
//             logGroupName,logStreamName,logEvents:[{message,timestamp: Date.now()}]
//         })
//     );
//     console.log("cloudwatch log create success")
//     }catch(error){
//       console.error("cloudwatch log failed",error.message)
//     }
// };

// module.exports={logToCloudWatch};

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