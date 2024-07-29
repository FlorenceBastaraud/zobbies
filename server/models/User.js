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
  isVerified: {type: Boolean, required: true}
});


const UserModel = mongoose.model('User', UserSchema);

export {UserModel as User}