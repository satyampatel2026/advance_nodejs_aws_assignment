require('dotenv').config();
const express = require('express');
const errorHandler=require('./middleware/errorMiddleware');
const {requestLogger}=require('../src/middleware/loggerMiddleware')

const app = express();
app.use(express.json());
app.use(requestLogger);

// Routes import
const userRouter = require("./routes/userRoute");
const documentRouter = require("./routes/documentRoute");
const authRouter =require('./routes/authRoute');

app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", documentRouter);
app.use(errorHandler);

app.listen(process.env.PORT,()=>{
    console.log(`server is runing on port ${process.env.PORT || 3004}`)
});


