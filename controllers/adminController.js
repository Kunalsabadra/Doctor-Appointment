const User = require("./../models/userModels")
const Doctor = require("./../models/doctorModel");
const Admin = require("./../models/adminModel");
const Appointment = require('./../models/appointmentModel')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.login = async (req, res) => {
    const { email, password } = req.body;

    // check if any of the field is null
    if (!(email && password)) res.json({ status: 400, success: false, message: "Invalid fields" });
    try {

        // Check if Admin exist
        const findAdmin = await Admin.findOne({ email: email });

        // If admin not found
        if (findAdmin == null) {
            res.json({ status: 400, success: false, message: "Admin not found" });
        } else {

            // If password is matched
            if (bcrypt.compareSync(password, findAdmin.password)) {
                // update the admin login logs

                const loginLogObj = {
                    ip: req.ip,
                    isLoggedInSuccessfully: true,
                    timeStamp: Date.now()
                }

                findAdmin.loginLogs.push(loginLogObj)
                const newAdminObj = await findAdmin.save()

                const payload = newAdminObj.toJSON();
                delete payload.password;

                const token = jwt.sign({

                }, XYZ123456, { expiresIn: 60 * 60 });

                res.json({ status: 200, success: true, message: "Admin logged in Successfully", token: token })
            }
            else {
                // if failed to login update the login logs 

                const loginLogObj = {
                    ip: req.ip,
                    isLoggedInSuccessfully: false,
                    timeStamp: Date.now()
                }

                findAdmin.loginLogs.push(loginLogObj);
                await findAdmin.save();

                res.json({ status: 400, success: false, message: "Email or password is wrong" });
            }
        }
    } catch (err) {
        res.json({ status: 500, success: false, error: err.message })
    }
}

//get All Users
exports.getAllUsersController = async (res, req) => {
    try {
        const users = await User.find({});
        res.json({ status: 200, success: true, data: users })
    }
    catch (err) {
        console.log("Hello");
    }
}

//Approve Doctor

exports.approveDoctorController = async (req, res) => {

    try {
        const { doctorId } = req.body;
        const doctor = await Doctor.findOne({ _id: req.body.doctorId });

        if (!doctor) {
            res.json({ status: 500, success: false, message: "Doctor is not registered yet" })
        }
        else {

            if (doctor.isApproved === false) {
                doctor.isApproved = true;
            }
            else {
                res.json({ message: "Doctor is already Approved" });
            }
            await doctor.save();

            res.status(200).send({
                success: true,
                message: "Doctor Approved",
                data: doctor
            })
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            error: err.message
        })
    }
}

//get All users booked Appointments
exports.appointmentsController = async (req, res) => {
    try {
        const appointments = await Appointment.find({})
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

