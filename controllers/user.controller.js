const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Report = require('../models/report');
const helper = require('../helper/index');
const ErrorWithCode = require('../class/error');

module.exports = {
  async createUser(req, res) {
    try {
      const password = req.body.password ? req.body.password : helper.generatePassword();
      const user = new User({
        ...req.body,
        password,
        active_code: password,
      });

      await user.save();

      res.status(200).send(user);
    } catch (error) {
      res.status(409).send(error);
    }
  },
  async getAllUser(req, res) {
    try {
      const users = await User.find();
      // console.log(users);

      res.status(200).send(users);
    } catch (error) {
      res.status(404).send(error);
    }
  },
  async getUser(req, res) {
    try {
      const user = await User.findById(req.params.userId);

      res.status(200).send(user);
    } catch (error) {
      res.status(404).send(error);
    }
  },
  async updateUser(req, res) {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['username', 'password', 'active', 'active_code'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }
    try {
      updates.forEach((update) => {
        req.user[update] = req.body[update];
      });
      await req.user.save();
      return res.status(200).send(req.user);
    } catch (error) {
      return res.status(404).send(error);
    }
  },
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findByCredentials(username, password);
      const token = await user.generateAuthToken();

      res.status(200).send({ user, token });
    } catch (error) {
      res.status(404).send(error);
    }
  },

  async delete(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);

      res.status(200).send(user);
    } catch (error) {
      res.status(404).send(error);
    }
  },
  async refreshUser(req, res) {
    try {
      const password = helper.generatePassword();
      const user = await User.findById(req.params.userId);
      user.active = false;
      user.password = password;
      user.active_code = password;

      await user.save();

      res.status(200).send(user);
    } catch (error) {
      res.status(404).send(error);
    }
  },
  async changePass(req, res) {
    try {
      const isMatch = await bcrypt.compare(req.body.password, req.user.password);
      if (isMatch) {
        req.user.password = req.body.newPassword;
        await req.user.save();
      } else {
        throw new ErrorWithCode('WRONG_PASS');
      }

      res.status(200).send(req.user);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  async addPermission(req, res) {
    try {
      const { permission } = req.body;
      const games = await Report.find().select('Game').distinct('Game');
      const user = await User.findById(req.params.userId);

      if (!games.includes(permission)) throw new ErrorWithCode('PERMISSION_NOT_EXIST');
      if (user.permissions.includes(permission)) throw new ErrorWithCode('PERMISSION_EXIST');

      user.permissions = user.permissions.concat(permission);

      await user.save();

      res.status(200).send(user);
    } catch (error) {
      res.status(404).send(error);
    }
  },

  async deletePermission(req, res) {
    try {
      const { permission } = req.body;
      const user = await User.findById(req.params.userId);
      const games = await Report.find().select('Game').distinct('Game');

      if (!games.includes(permission)) throw new ErrorWithCode('PERMISSION_NOT_EXIST');
      user.permissions = user.permissions.filter((p) => p !== permission);
      await user.save();

      res.status(200).send(user);
    } catch (error) {
      res.status(404).send(error);
    }
  },
};
