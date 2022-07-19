const { Thought, User } = require('../models');

module.exports = {
  //Creates a new thought
  createThought(req, res) {
    if(req.body.userId) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Thought created, but found no user with that ID',
            })
          : res.json('Created the thought! 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    } else {
      res.status(404).json({message: 'User ID not provided!'});
    }
  },
  //Gets all thoughts
  getThoughts(req, res) {
    Thought.find({})
      //Populate the thoughts for a thought
      .populate({ path: 'reactions', select: '-__v' })
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  //Gets a single thought by their ID
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.id })
      .populate({ path: 'reactions', select: '-__v' })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought at that ID 😕' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  //Update a thought by id
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID 😕' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  //Delete a thought by id
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res
            .json({ message: 'Thought deleted but no user with this id!' })
          : res.json({ message: 'Thought successfully deleted! 💥' })
      )
      .catch((err) => res.status(500).json(err));
  },

  //Add a friend to thought
  createReaction(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId },
      { $push: { reactions: body} },
      { runValidators: true, new: true   }
    )
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  //Delete a friend from a thought
  deleteReaction(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId },
      { $pull: { reactions: {reactionId: req.params.reactionId} } },
      { runValidators: true, new: true  }
    )
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  }
};