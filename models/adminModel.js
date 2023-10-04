const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },

    loginLogs: [
        {
            ip: { type: String },
            isLoggedInSuccessfully: { type: Boolean },
            timeStamp: { type: Date },
        }
    ],

    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date },
    updatedBy: { type: String }

});

module.exports = new mongoose.model('Admin', adminSchema);