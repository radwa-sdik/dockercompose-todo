const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const UserModel = require('../models/users');
require('dotenv').config();

exports.createUser = async (req, res) => {
    const { username, email , password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ username, email, password: hashedPassword });
        const user = await newUser.save();
        if (!user) {
            return res.status(400).json({ message: 'Error registering user' });
        }
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        return res.status(500).json({ message: 'Error registering user' });
    }
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        } else {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
            res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
            }).json({ message: "Logged in" });
        }
    } catch (err) {
        return res.status(500).json({ message: 'Error logging in' });
    }
};

exports.logoutUser = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
}