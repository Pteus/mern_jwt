require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');

const app = express();

// middlewares
// body json parser
app.use(express.json());
//simple logging
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// routing
app.use('/api/workouts', workoutRoutes);

// db connection
// mongodb
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected');
        const port = process.env.PORT;
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        })
    })
    .catch(err => console.log(err));
