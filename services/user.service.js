const mongo=require("../shared/mongo")
const {ObjectId}=require("mongodb")
const {userAddSchema}=require("../shared/schema")

const service={

    async getAllUsers(req,res)
    {
        try{
                const users=await mongo.users.find().toArray()

                res.status(200).send(users)
        }
        catch(err)
        {
            console.log(err)
            res.status(500).send(err)
        }
    },

    async getUser(req,res)
    {
        try{
            const user=await mongo.users.findOne({_id:ObjectId(req.params.id)})
            res.status(200).send(user)
        }
        catch(err)
        {
            console.log(err)
            res.status(500).send(err)
        }
    },

    async addUser(req,res)
    {
        try{
            const {value,error}=await userAddSchema.validate(req.body)

            if(error) res.status(400).send({Error:error.details[0].message})

            else {
            let  user= await mongo.users.findOne({$or:[{email:value.email},{mobile:value.mobile}]})
                console.log(user)
            if(user)
               res.status(400).send("Email/Mobile aready exists")
            else{ await mongo.users.insertOne(value)
           
            res.status(201).send("User Added")
            }}

        }
        catch(err)
        {
            console.log(err)
            res.status(500).send(err)
        }
    },

    async editUser(req,res)
    {
        try{
            const updatedUser=await mongo.users.findOneAndUpdate({_id:ObjectId(req.params.id)},{$set:req.body},{ReturnDocument:"after"})
            res.status(200).send("user updated")
        }
        catch(err)
        {
            console.log(err)
            res.status(500).send(err)
        }
    },

    async deleteUser(req,res)
        {
            try{
                
                await mongo.users.deleteOne({_id:ObjectId(req.params.id)})
                res.status(200).send("user Deleted")
            }
            catch(err)
            {
                console.log(err)
                res.status(500).send(err)
            }
        
    }

}
module.exports=service