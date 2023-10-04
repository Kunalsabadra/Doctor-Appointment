const mongoose = require('mongoose');

// const url = mongoose.env.MONGO_URL;


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Mongodb connected ${mongoose.connection.host}`);
    }
    catch (err) {
        console.log(`Mongodb Server Issues ${err}`);
    }
}

module.exports = connectDB;
