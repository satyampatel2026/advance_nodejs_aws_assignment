const connection=require("../config/db");
const jwt=require('jsonwebtoken');

const createUser= (req,res)=>{
  let {name,email}=req.body;
   if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: "Name and email are required",
    });
  }
  let query= `insert into users set name=?, email=? ;`
  connection.query(query,[name,email],(err,result)=>{
    if(err){
        console.log("user err",err);
        return res.status(500).json({
            success:false,
            message:"failed to create user"
        });
    }
    res.status(200).json({
        success:true,
        message:"user create success",
        data:{id:result.insertId,
            name,email
        }
    })
  })
}

const getUserById=(req,res)=>{
    const {id} =req.params;
    let query= `select * from users where id=?`
    connection.query(query,[id],(err,result)=>{
        if(err){
            console.log("get user err",err)
            return res.status(500).json({
                success:false,
                message:"failed to get user"
            })
        }
        if(result.length===0){
        return res.status(404).json({
            success:false,
            message:"user not found"
        })
        }
        res.status(200).json({
            success:true,
            message:"user found success",
            data:result[0]
        })
    })


}


module.exports={createUser,getUserById};