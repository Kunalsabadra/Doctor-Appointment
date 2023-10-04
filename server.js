const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const Doctor = require('./models/doctorModel');
const User = require('./models/userModels');
const Appointment = require('./models/appointmentModel')

//dotenv config
dotenv.config();

connectDB();

//rest object
const app = express();


//middlewares
app.use(express.json());
app.use(morgan('dev'));

//routes
// app.get('/', (req, res) => {
//     res.status(200).send({
//         message: "Server running"
//     });
// });

// User/Patient route
app.use('/api/user', require('./routes/userRoutes'))

// doctor route
app.use('/api/doctor', require('./routes/doctorRoutes'))

//admin  routes
app.use("/api/admin", require('./routes/adminRoutes'))


//port
const port = process.env.PORT || 8080

//listen port
app.listen(port, () => {
    console.log(`Serever Running in ${process.env.DEV_MODE} Mode on port ${process.env.PORT}`)
});



//Get all doctors
app.get('/doctors', async (req, res) => {
    const doctor = await Doctor.find({});
    if (doctor) {
        res.json(doctor)
    }
    else {
        res.send("Something went wrong");
    }
})

//Get all users
app.get('/users', async (req, res) => {
    const users = await User.find({});
    if (users) {
        res.json(users)
    }
    else {
        res.send("Something went wrong");
    }
})

//Get all Appointments
app.get('/appointments', async (req, res) => {
    const appointments = await Appointment.find({});
    if (appointments) {
        res.json(appointments)
    }
    else {
        res.send("Something went wrong");
    }
})

