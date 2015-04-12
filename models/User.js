var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
// var mongoose = require('mongoose');
require('lazy-ass');
var check = require('check-more-types');
var R = require('ramda');

// Helper method for getting user's gravatar.
function userGravatar(size) {
  if (!size) size = 200;
  if (!this.email) return 'https://gravatar.com/avatar/?s=' + size + '&d=retro';
  var md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
};

function createUserStore(pouchDb) {
  console.log('createUserStore');
  la(pouchDb, 'expected pouch db');
  la(check.fn(pouchDb.store), 'missing pouch store function, use store.pouchdb');
  var User = pouchDb.store();

  User.gravatar = userGravatar;

  return User;
}

module.exports = R.once(createUserStore);

/*
var userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,

  facebook: String,
  twitter: String,
  google: String,
  github: String,
  instagram: String,
  linkedin: String,
  tokens: Array,

  profile: {
    name: { type: String, default: '' },
    gender: { type: String, default: '' },
    location: { type: String, default: '' },
    website: { type: String, default: '' },
    picture: { type: String, default: '' }
  },

  resetPasswordToken: String,
  resetPasswordExpires: Date
});

// Password hash middleware.
userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// Helper method for validating user's password.
userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};



module.exports = mongoose.model('User', userSchema);
*/
