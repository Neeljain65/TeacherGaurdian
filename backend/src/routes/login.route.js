const express = require('express');
const loginController = require('../controllers/login.controller');
const { signup, admin, teachers } = require('../models');
const Router = express.Router();
Router.post('/generate-otp', async(req, res) => {
    const { email } = req.body;

    try{
        console.log(email);
       
        const isRegistered = await loginController.isEmailRegistered(email);
        console.log("reg",isRegistered);
        if (!isRegistered) {
            return res.status(400).send({ message: 'You need to register' });
        }
        
        const otp = await loginController.generateandStoreOTP(email);

        const  sent=  await loginController.sendOTPEmail(email, otp);

        
        return res.status(200).send({ message: 'OTP sent successfully' });
    } catch(error){
        return res.status(200).send({ message: 'Error generating otp',error: error.message });
    }
});

//router of logining in
Router.post('/login', async(req, res) => {
    const { email, otp } = req.body;

    try{
        //verify the otp
        console.log(email,otp);
        const isValid = await loginController.verifyOTP(email, otp);
        if (isValid){
            const userId= await signup.findOne({ where: { stud_email:email } });
            const uid = userId.UID;
            res.status(200).json({ message: 'OTP verified successfully',userId:userId.UID });
        }
    } catch(error){
        res.status(401).send({ message: error.message})
    }
});
Router.post('/AdminLogin', async(req, res) => {
    const { email, password } = req.body;

    try{
        //verify the otp
        const isValid = await loginController.AdminLogin(email, password);
        if (isValid){
            const userId= await admin.findOne({ where: { admin_email:email } });
            const uid = userId.admin_id;
            res.status(200).json({ message: 'OTP verified successfully',userId:userId.admin_id });
        }
        
    } catch(error){
        res.status(401).send({ message: error.message})
    }
}   );
Router.post('/TeacherLogin', async(req, res) => {
    const { email, password } = req.body;

    try{
        //verify the otp
        const isValid = await loginController.TeacherLogin(email, password);
        if (isValid){
            console.log(email);
            const userId= await teachers.findOne({ where: { teacher_email:email } });
            res.status(200).json({ message: 'OTP verified successfully' , userId:userId.teacher_id});
        }
        
    } catch(error){
        res.status(401).send({ message: error.message})
    }
}   );
module.exports = Router;