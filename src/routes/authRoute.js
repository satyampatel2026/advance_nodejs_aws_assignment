const express=require('express');
const authRouter = express.Router();
const {register,login}=require ("../controllers/authController");

authRouter.post("/api/auth/register", register);
authRouter.post("/api/auth/login", login);

module.exports=authRouter;