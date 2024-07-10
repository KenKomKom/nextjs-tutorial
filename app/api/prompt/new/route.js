import Prompt from '@/models/Prompt';
import {connectedToDB} from '@/utils/database'

export const POST = async(req)=>{
    const {userId,prompt, tag} = await req.json();
    try {
        await connectedToDB()
        const newPrompt = new Prompt({
            creator:userId,
            tag:tag,
            prompt:prompt
        })

        await newPrompt.save()
        return new Response(JSON.stringify(newPrompt), {status:201}) 
    } catch (error) {
        console.log(error)
        return new Response("CreatePrompt Failed", {status:500}) 
    }
}