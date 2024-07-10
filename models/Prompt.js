import { Schema, model, models } from "mongoose";

const PromptSchema = Schema({
    creator :{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    prompt:{
        type:String,
        required:[true, 'PROMPT is REQUIRED'],
    },
    tag:{
        type:String,
        required:[true, 'TAG is REQUIRED'],
    }
})

const Prompt = models.Prompt || model("Prompt", PromptSchema)

export default Prompt