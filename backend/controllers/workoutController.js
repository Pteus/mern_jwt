const Workout = require('../models/workoutModel')
const mongoose = require('mongoose');

// get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1});

    res.status(200).json(workouts);
}

// get a workout
const getWorkout = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Workout not found'});
    }

    const workout = await Workout.findById(id);

    if (!workout) {
        return res.status(404).json({error: 'Workout not found'});
    }

    res.status(200).json(workout);
}

// create a new workout
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body;

    let emptyFields = []
    if (!title) {
        emptyFields.push('title');
    }
    if (!reps) {
        emptyFields.push('reps');
    }
    if (!load) {
        emptyFields.push('load');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill all fields', emptyFields});
    }

    try {
        const workout = await Workout.create({title, load, reps});
        res.status(201).json(workout);
    } catch (err) {
        res.status(500).json({error: err.message});
        console.log(err);
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Workout not found'});
    }

    const workout = await Workout.findByIdAndDelete(id);

    if (!workout) {
        return res.status(404).json({error: 'Workout not found'});
    }

    res.status(200).json(workout);
}

// update a workout
const updateWorkout = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Workout not found'});
    }

    const workout = await Workout.findByIdAndUpdate(id, req.body);

    if (!workout) {
        return res.status(404).json({error: 'Workout not found'});
    }

    res.status(200).json(workout);
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}