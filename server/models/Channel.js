import mongoose from 'mongoose';

const ChannelSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  displayName: {type: String, required: true, unique: true},
  members: {type: Array, required: true},
  chat: {type: Array, required: true}
});


const ChannelModel = mongoose.model('Channel', ChannelSchema, 'channels');

export {ChannelModel as Channel}