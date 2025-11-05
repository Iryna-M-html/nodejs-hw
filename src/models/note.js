import mongoose from 'mongoose';
const noteSchema = new mongoose.Schema(
  {
    title: { type: String, reguired: true },
    content: { type: String, reguired: true },
    tag: { type: String, reguired: true },
  },
  {
    timestamps: true,
  },
);

export const Note = mongoose.model('Note', noteSchema);
// {
//   "_id": {
//     "$oid": "690b373afada528db5e7eaea"
//   },
//   "title": "Buy groceries",
//   "content": "Milk, eggs, bread, coffee",
//   "tag": "Shopping"
// }
