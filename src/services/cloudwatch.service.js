const {CloudWatchClient, PutMetricDataCommand}=require('@aws-sdk/client-cloudwatch');
const cloudWatchClient= new CloudWatchClient({
    region:process.env.AWS_REGION,
    credentials:{
        accessKeyId:process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
    }
})

const putMetric=async(metricName,value=1)=>{
    try{
     await cloudWatchClient.send(
        new PutMetricDataCommand({
            Namespace:"/document-platform",
            MetricData:[{
                MetricName:metricName,
                Value:value,
                Unit:"Count"
            }]
        })
     )
     console.log(`cloudwatch metric sent:${metricName}`);
    }catch(error){
      console.log(`cloudwatch metric failed ${metricName}`)
      console.log("error message:",error.message);
    }
} 
 module.exports={putMetric};