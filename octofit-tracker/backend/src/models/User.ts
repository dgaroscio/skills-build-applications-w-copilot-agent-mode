import { Schema, model, models, type InferSchemaType } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    age: { type: Number, required: true, min: 13 },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    goal: { type: String, required: true, trim: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
  },
  { timestamps: true }
);

export type UserDocument = InferSchemaType<typeof userSchema>;

export const User = models.User || model('User', userSchema);
