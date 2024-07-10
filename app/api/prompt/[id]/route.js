import Prompt from "@/models/Prompt";
import connectedToDB from "@/utils/database"

export const GET=async (req, {params})=>{
    try {
        await connectedToDB();
        console.log("zczc param.id")
        console.log("zczc ", params.id)
        let prompts = await Prompt.findById(params.id).populate('creator')
        return new Response(JSON.stringify(prompts), {status:200})
    } catch (error) {
        console.log(error)
        return new Response("Fetch Posts failed", {status:500})
    }
}

export const PATCH=async (req, {params})=>{
    try {
        await connectedToDB();
        const {prompt, tag}= await req.json()
        
        let oldPrompt = await Prompt.findById(params.id).populate('creator')

        if (!oldPrompt) return new Response(`prompt with ${params.id} not found`, {status:404})
        oldPrompt.prompt=prompt
        oldPrompt.tag=tag

        await oldPrompt.save()
        return new Response(JSON.stringify(oldPrompt), {status:200})
    } catch (error) {
        console.log(error)
        return new Response("EDIT Posts failed", {status:500})
    }
}

export const DELETE=async (req, {params})=>{
    try {
        let id = params.id
        await connectedToDB()
        let oldPrompt = await Prompt.findByIdAndDelete(id)
        return new Response(JSON.stringify(oldPrompt), {status:200})
    } catch (error) {
        console.log(error)
        return new Response("DELETE Posts failed", {status:500})
    }
}