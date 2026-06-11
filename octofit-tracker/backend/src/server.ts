import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { Activity } from './models/Activity';
import { connectDatabase } from './config/database';
import { Leaderboard } from './models/Leaderboard';
import { Team } from './models/Team';
import { User } from './models/User';
import { Workout } from './models/Workout';

dotenv.config();

const app = express();
const PORT = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend' });
});

app.get('/api/config', (_req, res) => {
  res.json({ apiBaseUrl });
});

app.get('/api/users/', (_req, res) => {
  User.find()
    .populate('team', 'name city')
    .lean()
    .then((items) => res.json({ resource: 'users', items }))
    .catch((error) => {
      console.error('Failed to fetch users', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    });
});

app.get('/api/teams/', (_req, res) => {
  Team.find()
    .populate('members', 'name email fitnessLevel')
    .lean()
    .then((items) => res.json({ resource: 'teams', items }))
    .catch((error) => {
      console.error('Failed to fetch teams', error);
      res.status(500).json({ error: 'Failed to fetch teams' });
    });
});

app.get('/api/activities/', (_req, res) => {
  Activity.find()
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
  Leaderboard.find()
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
  Workout.find()
    .sort({ level: 1, durationMinutes: 1 })
    .lean()
    .then((items) => res.json({ resource: 'workouts', items }))
    .catch((error) => {
      console.error('Failed to fetch workouts', error);
      res.status(500).json({ error: 'Failed to fetch workouts' });
    });
});

const start = async (): Promise<void> => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`OctoFit backend listening on ${apiBaseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start backend service', error);
    process.exit(1);
  }
};

void start();
