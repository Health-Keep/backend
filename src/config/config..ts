import mongoose from "mongoose";


const connect_db = async ()=>{

    try {
        await mongoose.connect(process.env.MONGODB_URL as string).then((connected) => console.log(`Connected to ${connected.connection.name} ${connected.connection.host}`) )       
    } catch (error: any) {
        console.log(`Failed to connect to ${error.message}`)
    }

}

export default connect_db;