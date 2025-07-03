const express=require("express");
const router=express.Router();
const {createDoctorProfile, getDoctorProfile}=require("../controllers/doctor.controller");
const authMiddleware=require("../middleware/authMiddleware");
const roleMiddleware=require("../middleware/roleMiddleware");

router.post('/profile', authMiddleware, roleMiddleware("doctor"), createDoctorProfile);
router.get('/profile', authMiddleware, roleMiddleware("doctor"),getDoctorProfile);

module.exports = router;
