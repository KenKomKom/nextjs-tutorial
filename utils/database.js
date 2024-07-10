import mongoose from "mongoose";

let isConnected = false; //track connection

export const connectedToDB = async () => {
    mongoose.set('strictQuery', true);
    if (isConnected){
        console.log("db is connected")
    }else{
        try{
            await mongoose.connect(process.env.DB_URI,{
                dbName:'',
                useNewUrlParser: true,
                useUnifiedTopology:true,
            })

            isConnected=true;
        }catch(error){
            console.log(error)
        }
    }
}

export default connectedToDB