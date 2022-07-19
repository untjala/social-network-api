const { User } = require('../models');

module.exports = {
  //Creates a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json({message: 'User created! 🥳 '}))
      .catch((err) => res.status(500).json(err));
  },

  //Gets all users
  getUsers(req, res) {
    User.find({})
    //Populate the thoughts for a user
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    //Populate the friends for a user
    .populate({
      path: 'friends',
      select: '-__v'
    })
    .select('-__v')
      .then((users) => res.json(users))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  },

  //Gets a single user by their ID
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.id })
      .select('-__v')
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID 😕' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  //Update a user by their id
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID 😕' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  //Deletes a user by id
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((user) =>
        !user
          ? res
            .json({ message: 'No user found with this id!' })
          : res.json({ message: 'User successfully deleted! 💥' })
      )
      .catch((err) => res.status(500).json(err));
  },

  //Add a friend to user
  addAFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId },
      { $push: { friends: params.friendsId } },
      { new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  //Delete a friend from a user
  removeFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId },
      { $pull: { friends: params.friendsId } },
      { new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
};
