import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Curious if it's possible to do this with a class
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true, 
    lowercase: true
  },
  password: String
});

// Before saving, hash the plain text password
userSchema.pre('save', function(next) {
 const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    })
  });
});

/**
 * Adds method on to the userSchema class
 * Checks if the user provided password matches the password in the instance
 * 
 * @param {string} canidatePassword
 * @param {func} cb the callback function
 * 
 * @return {bool} if the password is a match
 */
userSchema.methods.comparePassword = function(canidatePassword, cb) {
  bcrypt.compare(canidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);

    cb(null, isMatch);
  });
};

// The exported UserClass
export default mongoose.model('user', userSchema);