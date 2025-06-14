const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const dotenv = require('dotenv');
const studentRoutes = require('./routes/student');
dotenv.config();

const app = express();
const PORT = 5000;

// Use the correct env variable name (MONGO_URL from docker-compose)
const mongoURI = process.env.MONGO_URL;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB error:', err));

// add all the routes here 
app.use(express.json());
app.use('/api', userRoutes);
app.use('/student', studentRoutes);


app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});


