import mongoose from 'mongoose';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Team } from '../models/Team';
import { User } from '../models/User';
import { Workout } from '../models/Workout';

const MONGO_URI = 'mongodb://127.0.0.1:27017/octofit_db';

const seed = async (): Promise<void> => {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(MONGO_URI);

  await Promise.all([
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Team.deleteMany({}),
    User.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const workouts = await Workout.insertMany([
    {
      title: 'Morning Mobility Flow',
      level: 'beginner',
      focusArea: 'Mobility',
      durationMinutes: 20,
      equipment: ['Yoga mat'],
    },
    {
      title: 'Full Body Strength Circuit',
      level: 'intermediate',
      focusArea: 'Strength',
      durationMinutes: 45,
      equipment: ['Dumbbells', 'Resistance bands'],
    },
    {
      title: 'HIIT Sprint Blocks',
      level: 'advanced',
      focusArea: 'Cardio',
      durationMinutes: 30,
      equipment: ['Running shoes'],
    },
    {
      title: 'Core & Stability Builder',
      level: 'beginner',
      focusArea: 'Core',
      durationMinutes: 25,
      equipment: ['Yoga mat'],
    },
    {
      title: 'Cycling Endurance Ride',
      level: 'intermediate',
      focusArea: 'Endurance',
      durationMinutes: 60,
      equipment: ['Stationary bike'],
    },
  ]);

  const teams = await Team.insertMany([
    {
      name: 'Octo Runners',
      city: 'Milan',
      motto: 'Stride together, finish stronger.',
      members: [],
      membersCount: 0,
    },
    {
      name: 'Pulse Warriors',
      city: 'Rome',
      motto: 'Consistency beats intensity.',
      members: [],
      membersCount: 0,
    },
  ]);

  const users = await User.insertMany([
    {
      name: 'Giulia Ferri',
      email: 'giulia.ferri@octofit.dev',
      age: 29,
      fitnessLevel: 'intermediate',
      goal: 'Run a half marathon under 1h50m',
      team: teams[0]._id,
    },
    {
      name: 'Luca Bianchi',
      email: 'luca.bianchi@octofit.dev',
      age: 34,
      fitnessLevel: 'advanced',
      goal: 'Increase squat 1RM by 15kg',
      team: teams[1]._id,
    },
    {
      name: 'Sara Conti',
      email: 'sara.conti@octofit.dev',
      age: 26,
      fitnessLevel: 'beginner',
      goal: 'Complete 4 workouts per week',
      team: teams[0]._id,
    },
    {
      name: 'Marco Rinaldi',
      email: 'marco.rinaldi@octofit.dev',
      age: 31,
      fitnessLevel: 'intermediate',
      goal: 'Improve VO2 max for cycling races',
      team: teams[1]._id,
    },
  ]);

  await Team.updateOne(
    { _id: teams[0]._id },
    { members: [users[0]._id, users[2]._id], membersCount: 2 }
  );
  await Team.updateOne(
    { _id: teams[1]._id },
    { members: [users[1]._id, users[3]._id], membersCount: 2 }
  );

  const now = new Date();
  await Activity.insertMany([
    {
      user: users[0]._id,
      type: 'running',
      durationMinutes: 52,
      caloriesBurned: 510,
      performedAt: new Date(now.getTime() - 1000 * 60 * 60 * 24),
    },
    {
      user: users[1]._id,
      type: 'strength',
      durationMinutes: 48,
      caloriesBurned: 430,
      performedAt: new Date(now.getTime() - 1000 * 60 * 60 * 36),
    },
    {
      user: users[2]._id,
      type: 'yoga',
      durationMinutes: 30,
      caloriesBurned: 170,
      performedAt: new Date(now.getTime() - 1000 * 60 * 60 * 12),
    },
    {
      user: users[3]._id,
      type: 'cycling',
      durationMinutes: 65,
      caloriesBurned: 620,
      performedAt: new Date(now.getTime() - 1000 * 60 * 60 * 18),
    },
    {
      user: users[0]._id,
      type: 'hiit',
      durationMinutes: 28,
      caloriesBurned: 360,
      performedAt: new Date(now.getTime() - 1000 * 60 * 60 * 48),
    },
  ]);

  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  monday.setHours(0, 0, 0, 0);

  await Leaderboard.insertMany([
    { user: users[3]._id, points: 1520, rank: 1, weekStart: monday },
    { user: users[0]._id, points: 1480, rank: 2, weekStart: monday },
    { user: users[1]._id, points: 1410, rank: 3, weekStart: monday },
    { user: users[2]._id, points: 1080, rank: 4, weekStart: monday },
  ]);

  console.log(`Seeded users: ${users.length}`);
  console.log(`Seeded teams: ${teams.length}`);
  console.log('Seeded activities: 5');
  console.log('Seeded leaderboard entries: 4');
  console.log(`Seeded workouts: ${workouts.length}`);
};

seed()
  .then(() => mongoose.disconnect())
  .then(() => {
    console.log('Seeding completed successfully.');
  })
  .catch(async (error: unknown) => {
    console.error('Seeding failed.', error);
    await mongoose.disconnect();
    process.exit(1);
  });
