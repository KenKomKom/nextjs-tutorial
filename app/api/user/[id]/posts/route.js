import Prompt from "@/models/Prompt"
import connectedToDB from "@/utils/database"

export const GET= async(req, {params})=>{
    try {
        await connectedToDB()
        let posts = await Prompt.find({
            creator:params.id
        }).populate("creator")
        return new Response(JSON.stringify(posts), {status:201})
    } catch (error) {
        console.log(error)
        return new Response("Failed to get posts",{status:500})
    }
}