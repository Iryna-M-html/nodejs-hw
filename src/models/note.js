import mongoose, { Schema } from 'mongoose';
const noteSchema = new Schema(
  {},
  {
    timestamps: true,
  },
);

export const Note = mongoose.model('Note', noteSchema);
