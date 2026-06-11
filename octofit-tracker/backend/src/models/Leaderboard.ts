import { Schema, model, models, type InferSchemaType } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    weekStart: { type: Date, required: true },
  },
  { timestamps: true }
);

export type LeaderboardDocument = InferSchemaType<typeof leaderboardSchema>;

export const Leaderboard = models.Leaderboard || model('Leaderboard', leaderboardSchema);
