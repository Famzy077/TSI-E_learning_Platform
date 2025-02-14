const express = require('express');
const connectDB = require('./Db/connectDB')
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');


dotenv.config();

// Connect DataBase
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.get('/', (req, res) => {
    res.send('E-learning Platform API');
});

app.use('/auth', authRoutes);
app.use('/api', courseRoutes);


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});