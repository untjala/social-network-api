const { Schema, model, Types} = require('mongoose');
const moment = require('moment');

//Subdocument of reaction comes before the thought model as aspects of thought are dependent on the reaction schema
const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //Using moment to format timestamp
      get: formatTime => moment(formatTime).format('MMMM Do YYYY, h:mm a')
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    }
  }
);
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatTime => moment(formatTime).format('MMMM Do YYYY, h:mm a')
    },
    username: {
      type: String,
      required: true
    },
    reactions: {
      type: String,
      required: true
    },
    reactions: [ReactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);

//Virtual to retrieve the length of the 'reaction' array
thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  })
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
