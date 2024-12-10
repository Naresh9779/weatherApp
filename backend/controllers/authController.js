const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createUser, findUserByUsername } = require('../models/userModel');

const signup = (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    findUserByUsername(username, (err, results) => {
        if (results.length > 0) return res.status(400).json({ message: 'User already exists' });

        createUser(username, hashedPassword, (err) => {
            if (err) return res.status(500).json({ message: 'Error creating user' });
            res.status(201).json({ message: 'User created successfully' });
        });
    });
};

const login = (req, res) => {
    const { username, password } = req.body;

    findUserByUsername(username, (err, results) => {
        if (results.length === 0) return res.status(404).json({ message: 'User not found' });

        const user = results[0];
        if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ message: 'Invalid password' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    });
};

module.exports = { signup, login };
