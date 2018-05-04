const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrSchema = new Schema({
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
  exercise_id: { type: Schema.ObjectId, ref: 'exercises' },
  user_id: { type: Schema.ObjectId, ref: 'users', required: true }
});

module.exports = mongoose.model('prs', PrSchema);