const joi=require("joi")

const schema={

    userAddSchema:joi.object({
        username:joi.string().required(),
        email:joi.string().email().required(),
        mobile:joi.number().required()
    })
}
module.exports=schema