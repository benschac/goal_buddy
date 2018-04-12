import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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

userSchema.methods.comparePassword = function(canidatePassword, cb) {
  bcrypt.compare(canidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);

    cb(null, isMatch);
  });
};

const ModelClass = mongoose.model('user', userSchema);
export default ModelClass;