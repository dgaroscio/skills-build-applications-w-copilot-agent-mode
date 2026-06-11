"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const Activity_1 = require("./models/Activity");
const Leaderboard_1 = require("./models/Leaderboard");
const Team_1 = require("./models/Team");
const User_1 = require("./models/User");
const Workout_1 = require("./models/Workout");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 8000;
const MONGO_URI = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend' });
});
app.get('/api/config', (_req, res) => {
    res.json({ apiBaseUrl });
});
app.get('/api/users/', (_req, res) => {
    User_1.User.find()
        .populate('team', 'name city')
        .lean()
        .then((items) => res.json({ resource: 'users', items }))
        .catch((error) => {
        console.error('Failed to fetch users', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    });
});
app.get('/api/teams/', (_req, res) => {
    Team_1.Team.find()
        .populate('members', 'name email fitnessLevel')
        .lean()
        .then((items) => res.json({ resource: 'teams', items }))
        .catch((error) => {
        console.error('Failed to fetch teams', error);
        res.status(500).json({ error: 'Failed to fetch teams' });
    });
});
app.get('/api/activities/', (_req, res) => {
    Activity_1.Activity.find()
        .sort({ performedAt: -1 })
        .populate('user', 'name fitnessLevel')
        .lean()
        .then((items) => res.json({ resource: 'activities', items }))
        .catch((error) => {
        console.error('Failed to fetch activities', error);
        res.status(500).json({ error: 'Failed to fetch activities' });
    });
});
app.get('/api/leaderboard/', (_req, res) => {
    Leaderboard_1.Leaderboard.find()
        .sort({ rank: 1 })
        .populate('user', 'name')
        .lean()
        .then((items) => res.json({ resource: 'leaderboard', items }))
        .catch((error) => {
        console.error('Failed to fetch leaderboard', error);
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    });
});
app.get('/api/workouts/', (_req, res) => {
    Workout_1.Workout.find()
        .sort({ level: 1, durationMinutes: 1 })
        .lean()
        .then((items) => res.json({ resource: 'workouts', items }))
        .catch((error) => {
        console.error('Failed to fetch workouts', error);
        res.status(500).json({ error: 'Failed to fetch workouts' });
    });
});
const start = async () => {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        app.listen(PORT, () => {
            console.log(`OctoFit backend listening on ${apiBaseUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to start backend service', error);
        process.exit(1);
    }
};
void start();
