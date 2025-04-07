const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
    minlength: [2, "name is too short"],
    maxlength: 50,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
  },

  phoneNumber: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    maxlength: 50,
    required: true
  },
  status: {
    type: String,
    enum: ['connected', 'notConnected', null],
    default: null,
    required: false

  }
  , response: {
    type: String,
    enum: ['discussed', 'callback', 'interested', 'busy', 'RNR', 'switchedOff', null],
    default: null,
    required: false
  },
  telecaller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
},
  {
    timestamps: true,
  });

const Lead = mongoose.model("Leads", leadSchema);

module.exports = Lead;