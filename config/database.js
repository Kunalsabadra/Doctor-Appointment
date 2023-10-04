const mongoose = require('mongoose');

// const url = mongoose.env.MONGO_URL;


const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://kunal:kunal%401234@cluster0.fiew0ss.mongodb.net/Appointment?retryWrites=true&w=majority");
        console.log(`Mongodb connected ${mongoose.connection.host}`);
    }
    catch (err) {
        console.log(`Mongodb Server Issues ${err}`);
    }
}

module.exports = connectDB;
