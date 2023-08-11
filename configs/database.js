import mongoose from 'mongoose';

//connect to db
const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Database Connected')
    }catch(error){
        console.log('DB connection failed', error.message)
    }
}

export default connectDB