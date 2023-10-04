const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const doctorControllers = require("./../controllers/doctorController");

router.post("/register", doctorControllers.doctorRegister);

router.post("/login", doctorControllers.doctorLogin)



//Get Doctor By Id
router.post('/getDoctorById', authMiddleware, doctorControllers.getDoctorByIDController);

module.exports = router;