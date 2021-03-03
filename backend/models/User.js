const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  readingGoal: {
    type: Number
  },
  streak: {
    type: Number,
    default: 0
  },
  lastSevenDays: {
    type: Number,
    default: 0
  },
  dateJoined: {
    type: Date,
    default: Date.now
  },
  books: [
    {
      title: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
      yearPublished: {
        type: Number,
        required: true,
      },
      pages: {
        type: Number,
        required: true,
      },
      genres: [{
        name: {
          type: String,
          required: true
        },
      }],
      status: {
        type: String
      },
      dateStarted: {
        type: Date,
      },
      dateFinished: {
        type: Date,
      },
      rating: {
        type: Number,
      }
    }
  ]
});

module.exports = User = mongoose.model('User', UserSchema);