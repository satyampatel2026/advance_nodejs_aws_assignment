const express=require("express");
const userRouter=express.Router();
const {createUser,getUserById,loginUser}=require('../controllers/userController');

// userRouter.post('/api/users',createUser);
userRouter.get('/api/users/:id',getUserById)
// userRouter.post('/api/users/login',loginUser);

module.exports=userRouter;

