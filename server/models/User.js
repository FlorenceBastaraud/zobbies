import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  lastname: {type: String, required: true},
  firstname: {type: String, required: true},
  dateOfBirth: {type: Date, required: true},
  gender: {type: String, required: true},
  country: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  pl: {type: Number, required: true},
  isVerified: {type: Boolean, required: true},
  displayName: {type: String, required: true},
  bio: {type: String, required: true},
  userPicture: {type: String, required: true}
});


const UserModel = mongoose.model('User', UserSchema, 'users');

export {UserModel as User}