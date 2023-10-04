const Doctor = require('./../models/doctorModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.doctorRegister = async (req, res) => {
    const { username, email, password, mobile, address, specialization, image, summary, experience, feesOfConsultation, timings } = req.body;
    if (!(username && email && password && mobile && address && specialization && experience && feesOfConsultation && timings)) {
        re.json({ status: 400, success: false, message: " Invalid data" });
    }
    else {
        try {
            const doesDoctorExist = await Doctor.findOne({ email: email });
            if (doesDoctorExist !== null) {
                res.json({ status: 400, success: false, message: " Doctor is registered Already" });
            }
            else {
                const doctorObj = new Doctor();
                doctorObj.username = username;
                doctorObj.email = email;
                doctorObj.password = await bcrypt.hash(password, 10);
                doctorObj.mobile = mobile;
                doctorObj.address = address;
                doctorObj.specialization = specialization;
                doctorObj.experience = experience;
                doctorObj.feesOfConsultation = feesOfConsultation;
                doctorObj.timings = timings;


                if (image !== undefined) doctorObj.image = image;
                if (summary != undefined) doctorObj.summary = summary;

                const savedoctor = await doctorObj.save();

                const token = jwt.sign({ user_id: savedoctor._id }, `${process.env.JWT_SECRET}`, { expiresIn: "2h" });
                res.json({ status: 200, success: true, message: "Doctor Registered Successfully", data: token });
            }
        }
        catch (err) {
            console.log("Error in Doctor registration");
            res.json({
                status: err.status,
                success: false,
                error: err.message
            })
        }
    }

}

exports.doctorLogin = async (req, res) => {
    // console.log("Hello");
    const { email, password } = req.body;
    try {
        const doesDoctorExist = await Doctor.findOne({ email: email });
        if (doesDoctorExist === null) {
            res.json({ status: 404, success: false, message: "Doctor not found" });
        }
        else {
            if (await bcrypt.compare(password, doesDoctorExist.password)) {

                const token = jwt.sign(
                    { user_id: doesDoctorExist._id },
                    `${process.env.JWT_SECRET_KEY}`,
                    {
                        expiresIn: "2h",
                    }
                );
                res.json({ status: 200, success: true, message: "doctor logged in successfully", data: token });
            }
            else {
                res.json({ status: 400, success: false, message: "Invalid credentials" });
            }
        }
    }
    catch (err) {
        res.json({ status: err.status, success: false, error: err.message });
    }
}

exports.getDoctorByIDController = async (req, res) => {

    try {
        const doctor = await Doctor.findOne({ _id: req.body.doctorId });
        res.status(200)({
            success: true,
            message: "Single Doctor Info Fetched",
            data: doctor

        })
    }
    catch (err) {
        res.json({ status: err.status, success: false, error: err.message });
    }
} 