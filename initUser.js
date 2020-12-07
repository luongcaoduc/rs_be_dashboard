const User = require('./models/user');

const initUser = async () => {
  const user = await User.findOne({ username: 'admin' });
  if (user) return console.log('admin exist');

  const admin = new User({
    username: 'admin',
    password: '1234',
    active: true,
    role: 'admin',
    active_code: null,
  });
  await admin.save();
  return console.log('create admin success');
};

module.exports = initUser;
