const userModel = require('../models/user');
const config = require('../config/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');

const SECRET_KEY = config.secretKey; // Use from config for better security

// Helper function to send emails
const sendMail = async (email, fullName, token, res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.emailUser,
                pass: config.emailPassword,
            },
        });

        const info = {
            from: `${config.fromName} <${config.emailUser}>`,
            to: email,
            subject: 'Password Reset',
            html: `<p>
                Hi ${fullName},<br><br>
                <strong>Welcome to DreamCraft Events</strong><br><br>
                You have requested to reset your password. Please click the following link to reset your password:<br><br>
                <a href="http://localhost:4200/auth/reset?token=${token}">Reset Your Password</a><br><br>
                If you did not request a password reset, please ignore this email. Your password will remain unchanged.<br><br>
                Thank you for using our service.<br><br>
                Best Regards,<br>
                DreamCraft Events
            </p>`,
        };

        await transporter.sendMail(info);
        console.log('Mail sent successfully.');
    } catch (error) {
        console.error('Error in sending mail:', error);
        res.status(500).json({ msg: 'Error in sending mail', error: error.message });
    }
};

// Helper function to send registration emails
const registrationMail = async (email, fullName) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.emailUser,
                pass: config.emailPassword,
            },
        });

        const info = {
            from: `${config.fromName} <${config.emailUser}>`,
            to: email,
            subject: 'Registration Successful',
            html: `<p style="font-family: 'Arial', sans-serif; font-size: 16px; color: #333; line-height: 1.6;">
                Hi ${fullName},<br><br>
                <strong>Welcome to DreamCraft Events</strong><br>
                🎉 Congratulations on successfully registering with our Live Event Management service.<br><br>
                Best Regards,<br>
                DreamCraft Events
            </p>`,
        };

        await transporter.sendMail(info);
        console.log('Registration mail sent successfully.');
    } catch (error) {
        console.error('Error in sending registration mail:', error);
    }
};

// Signup function
const signup = async (req, res) => {
    const { fullName, email, phone, password, confirmPassword } = req.body;

    if (!fullName || !email || !phone || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords don't match" });
    }

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            fullName,
            email,
            phone,
            password: hashPassword,
            is_admin: 0,
        });

        const token = jwt.sign({ email: newUser.email, id: newUser._id }, SECRET_KEY);

        await registrationMail(newUser.email, newUser.fullName);

        res.status(201).json({
            message: 'Registration successful',
            user: newUser,
            token,
        });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};

// Signin function
const signin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const existingUser = await userModel.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY);

        res.status(200).json({ user: existingUser, token, redirect: '/dashboard' });
    } catch (error) {
        console.error('Error during signin:', error);
        res.status(500).json({ message: 'Signin failed', error: error.message });
    }
};

// Update password function
const updatePassword = async (req, res) => {
    const { user_id, password } = req.body;

    if (!user_id || !password) {
        return res.status(400).json({ message: 'User ID and password are required' });
    }

    try {
        const user = await userModel.findById(user_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newPassword = await bcrypt.hash(password, 10);
        await userModel.findByIdAndUpdate(user_id, { password: newPassword });

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Password update failed', error: error.message });
    }
};

// Forgot password function
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const token = randomstring.generate();
        const expirationTime = new Date(Date.now() + 3600000); // 1 hour from now

        await userModel.updateOne({ email }, { token, tokenExpiration: expirationTime });

        await sendMail(user.email, user.fullName, token, res);

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        console.error('Error during forgot password:', error);
        res.status(500).json({ message: 'Forgot password failed', error: error.message });
    }
};

// Reset password function
const resetPassword = async (req, res) => {
    const { token } = req.query;
    const { password } = req.body;

    if (!token || !password) {
        return res.status(400).json({ message: 'Token and password are required' });
    }

    try {
        const user = await userModel.findOne({ token, tokenExpiration: { $gt: new Date() } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        const newPassword = await bcrypt.hash(password, 10);
        await userModel.findByIdAndUpdate(user._id, { password: newPassword, token: '', tokenExpiration: null });

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error during reset password:', error);
        res.status(500).json({ message: 'Reset password failed', error: error.message });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to fetch users', error: error.message });
    }
};

// Find user by ID
const findUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ message: 'Failed to fetch user', error: error.message });
    }
};

// Logout user
const logoutUser = (req, res) => {
    res.clearCookie('jwt');
    res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = {
    signup,
    signin,
    updatePassword,
    forgotPassword,
    resetPassword,
    getAllUsers,
    findUserById,
    logoutUser,
};