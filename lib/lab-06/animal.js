const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  limbs: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  hasTail: {
    type: Boolean,
    default: false
  },
  traits: {
    isFurry: Boolean,
    canFly: Boolean,
    breathsWater: Boolean
  },
  diet: [{
    type: String,
    enum: ['food', 'water', 'treats']
  }]
});

module.exports = mongoose.model('Animal', schema);