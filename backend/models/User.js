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
      id: {
        type: String,
      },
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
      },
      pages: {
        type: Number,
        required: true,
      },
      status: {
        type: String
      },
      imageURL: {
        type: String
      },
      currentPage: {
        type: Number,
        default: 0
      },
      genres: [{
        name: {
          type: String,
          required: true
        },
      }],
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
  ],
  sessions: [
    {
      id: {
        type: String,
      },
      startingPage: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },

    }
  ]
});

module.exports = User = mongoose.model('User', UserSchema);