import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const { Schema } = mongoose;

const Account = new Schema({
  userName: String,
  password: String,
  phoneNumber: String,
  isActivated: Boolean,
  firstName: String,
  lastName: String,
});
/*eslint-disable */
Account.pre('save', function(next) {
  const account = this;
  if (this.isModified('password') || this.isNew) {
    account.password = bcrypt.hashSync(account.password, bcrypt.genSaltSync(10));
  } else {
    return next();
  }
  return next();
});

Account.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    return cb(null, isMatch);
  });
};


export default mongoose.model('Account', Account);

