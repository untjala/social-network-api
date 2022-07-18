const { Schema, model } = require('mongoose');
const moment = require('moment')

//Subdocument of reaction comes before the thought model as aspects of thought are dependent on the reaction schema
const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId
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
      get: timestamp => moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')
    },
  },
  {
    toJSON: {
      virtuals: true,
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
      default: Date.now
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
    },
    id: false,
  }
);

//Virtual to retrieve the length of the 'reaction' array
userSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  })
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
