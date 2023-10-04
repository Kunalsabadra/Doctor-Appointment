const User = require("./../models/userModels")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Doctor = require('./../models/doctorModel')
const Appointment = require('./../models/appointmentModel')
const moment = require('moment');

// User Login Controller
const loginController = async (req, res) => {
    const { email, password } = req.body;

    if (!(email && password)) {
        res.json({ status: 400, success: false, message: "Invalid data" })
    }
    else {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(200).send({ meassage: 'user not found', success: false });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(200).send({ message: 'Invalid Email or Password', success: false });
            }
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.status(200).send({ message: 'Login Success', success: true, message: "User LoogedIn Successfully ", data: token });

        }
        catch (err) {
            console.log(err);
            res.status(500).send({ message: `Error in Login ${error.message}` });
        }
    }
}

// User Registration Controller
const registerController = async (req, res) => {
    const { name, email, password, mobile, gender } = req.body;

    if (!(name && email && password && mobile && gender)) {
        res.json({ status: 400, success: false, message: "Invalid data" })
    }
    else {
        try {
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(200).send({ message: "User Already Exist", success: false })
            }
            else {
                const userObj = new User();
                userObj.name = name;
                userObj.email = email;
                userObj.password = await bcrypt.hash(password, 10);
                userObj.mobile = mobile;
                userObj.gender = gender;

                await userObj.save();

                res.status(201).send({ message: "Registeres Successfully", success: true, data: userObj });

            }

        }
        catch (err) {
            console.log(err);
            res.status(500)
                .send({
                    success: false,
                    message: `Reguster User ${err.message}`,
                });
        }
    }
}

//user Authorization Controller
const authController = async (req, res) => {

    try {
        const user = await User.findOne({ _id: req.body.userId });
        if (!user) {
            return res.status(200).send({
                message: "user not found",
                success: false,
            });
        }
        else {
            res.status(200).send({
                success: true,
                data: {
                    name: user.name,
                    email: user.email,
                    gender: user.gender,
                    mobile: user.mobile
                }
            })
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Authentication error",
            success: false,
            err
        })
    }
}

//Get All Doctors List
const doctorView = async (req, res) => {
    try {
        const doctors = await Doctor.find({ isApproved: true })
        res.status(200).send({
            success: true,
            message: "Doctors Lists Fetched Successfully",
            data: doctors
        });
    }
    catch (err) {
        res.json({ status: err.status, success: false, error: err.message });
    }
}

//Book Appointment

const bookAppointmentController = async (req, res) => {
    try {
        req.body.date = moment(req.body.date, 'DD-MM-YYYY').toISOString();
        req.body.time = moment(req.body.time, 'HH:mm').toISOString();
        req.body.status = "pending"
        const newAppointment = new Appointment(req.body);
        await newAppointment.save();
        res.status(200).send({
            success: true,
            message: "Appointment Booked Successfully"
        });

    }
    catch (err) {
        res.json({ status: err.status, success: false, error: err.message });
    }

}

//Chceking Doctor  Availabilty
// const checkingAvailability = async (req, res) => {
//     try {
//         req.body.date = moment(req.body.date, 'DD-MM-YYYY').toISOString();
//         req.body.time = moment(req.body.time, 'HH:mm').toISOString();
//         req.body.status = "pending"
//     }
//     catch (err) {
//         res.json({ status: err.status, success: false, error: err.message });
//     }
// }


// get User Appointments

const userAppointmenetsController = async (req, res) => {
    try {
        const appointments = await Appointment.find({ userId: req.body.userId })
        res.status(200).send({
            success: true,
            message: "Users Appointments Fetched Successfully",
            data: appointments
        })
    }
    catch (err) {
        res.json({ status: err.status, success: false, error: err.message })
    }
}


module.exports = { loginController, registerController, authController, doctorView, bookAppointmentController, userAppointmenetsController }