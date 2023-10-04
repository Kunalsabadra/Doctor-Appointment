const express = require('express')

const authMiddleware = require('./../middlewares/authMiddleware');
const { doctorView } = require('../controllers/userController');
const { getAllUsersController, login, approveDoctorController, appointmentsController } = require('../controllers/adminController');

const router = express.Router();

//Admin Login
router.post('/login', login);

//Get all users
// router.get('/getAllUsers', authMiddleware, getAllUsersController);

//Get all doctors
router.get('/getDoctors', authMiddleware, doctorView)

//Approve Doctor
router.post('/approveDoctor', authMiddleware, approveDoctorController)

//get All users booked Appointments
router.get('/getappointments', authMiddleware, appointmentsController);

module.exports = router;
