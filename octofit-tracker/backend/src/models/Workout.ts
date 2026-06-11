import { Schema, model, models, type InferSchemaType } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    focusArea: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    equipment: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;

export const Workout = models.Workout || model('Workout', workoutSchema);
