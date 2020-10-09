const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'employees'],
  },
  active: {
    type: Boolean,
    default: false,
  },
  active_code: {
    type: String,
  },
});

userSchema.pre('save', async function (next) {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  console.log(user);
  // eslint-disable-next-line no-underscore-dangle
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET_KEY);

  return token;
};

userSchema.statics.findByCredentials = async function (username, password) {
  const user = await this.findOne({ username });
  console.log(user);
  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
};

const User = model('User', userSchema);

module.exports = User;
