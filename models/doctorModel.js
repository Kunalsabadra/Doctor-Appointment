const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    image: { type: String, default: "" }, // image will be stored on the server

    summary: { type: String }, // summary about the doctor

    specialization: {
        type: String, required: true
    },

    experience: {
        type: String,
        required: true
    },

    feesOfConsultation: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    },
    timings: {
        type: String,
        required: true
    },
    ratings: {
        type: String
    },
    isApproved: {
        type: Boolean,
        default: false
    }

}, {
    timeStamps: true
})

const doctorModel = mongoose.model('doctors', doctorSchema);
module.exports = doctorModel; 