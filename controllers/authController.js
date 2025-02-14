const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// const register = async (req, res) => {
//     const { email, password, role } = req.body;
//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = new User({ email, password: hashedPassword, role });
//         await user.save();
//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//         console.log('Error registering user:', err);
        
//     }
// };
const register = async (req, res) => {
    console.log('Request body:', req.body); // Log the request body
    const { username, email, password, role } = req.body;

    try {
        const saltRounds = 10; // Define the salt rounds
        console.log('Password:', password); // Log the password
        console.log('Salt rounds:', saltRounds); // Log the salt rounds

        const hashedPassword = await bcrypt.hash(password, saltRounds); // Use saltRounds
        const user = new User({ username, email, password: hashedPassword, role });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ error: err.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
module.exports = { register, login };