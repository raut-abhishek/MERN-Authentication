import mongoose from 'mongoose';

const connectDB  = async ()=>{
    mongoose.connect.on('connected', ()=>{
        console.log("connected to Database");

    })
    await mongoose.connect(`${process.env.MONGODB_URL} `)
}

export default connectDB;