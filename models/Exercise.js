const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  name: { type: String, required: true },
  group: { type: String, required: true },
  user_id: { type: Schema.ObjectId, ref: 'users', required: true }
});

module.exports = mongoose.model('exercises', ExerciseSchema);