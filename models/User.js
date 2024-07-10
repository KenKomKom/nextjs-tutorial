import { Schema, model, models } from "mongoose";

const UserSchema = Schema({
    email:{
        type:String,
        unique:[true, 'Email already EXISTS'],
        required:[true, 'EMAIL IS REQUIRED']
    },
    username:{
        type:String,
        required:[true, 'Username is REQUIRED'],
        match: [/[a-zA-Z0-9]/, "ONLY SINGLE Alphanumeric Character"]
    },
    image:{
        type:String
    }
})

const User = models.User || model("User", UserSchema)

export default User