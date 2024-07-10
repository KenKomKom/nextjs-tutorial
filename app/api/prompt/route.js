import Prompt from "@/models/Prompt";
import connectedToDB from "@/utils/database"

export const POST=async (req)=>{
    try {
        await connectedToDB();
        let {targetSearch} = await req.json()
        let prompts=[]
        if (String(targetSearch).length<=0){
            prompts = await Prompt.find().populate('creator')
        }else if(targetSearch[0]=='#'){
            prompts = await Prompt.find({"tag":targetSearch}).populate('creator')
        }else{
            console.log("masuk ke sini")
            prompts = await Prompt.find().populate({
                path: 'creator',
                match: {
                  username: targetSearch
                }
            }).then((res)=> {
                return res.filter((prompt)=>prompt.creator!=null)
            });
        }
        console.log(prompts)
        console.log("zczc", targetSearch)
        return new Response(JSON.stringify(prompts), {status:200})
    } catch (error) {
        console.log(error)
        return new Response("Fetch Posts failed", {status:500})
    }
}