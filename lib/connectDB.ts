import mongoose from "mongoose"

let cache = global.mongoose;

if(!cache) {
    global.mongoose = {
        conn: null,
        promise: null
    }
}



const connectDB = async() => {

    if(cache.conn) {
        return cache.conn;
    }
    if(!cache.promise) {
        cache.promise = mongoose.connect(`${process.env.MONOGODB_URI!}`).then((c) => c.connection);

    }
    try {
        cache.conn = await cache.promise;
        console.log("Mongodb Connected Successfully");
        

    } catch (error) {
        console.log("Error in connecting to db: ", error);
        process.exit(1);
    }
}

export default connectDB;