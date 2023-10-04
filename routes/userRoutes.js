const express = require('express');
const { loginController, registerController, authController, applyDoctorController, doctorView, bookAppointmentController, userAppointmenetsController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

//login route
router.post('/login', loginController);

//register route
router.post('/register', registerController);

//Authorization
router.post('/getUserData', authMiddleware, authController)


//List of doctors
router.get('/getDoctors', authMiddleware, doctorView);

//Book AAppointment
router.post('/book-Appointment', authMiddleware, bookAppointmentController);

//get all appointments
router.get('/get-bookedAppointments', authMiddleware, userAppointmenetsController)


module.exports = router;