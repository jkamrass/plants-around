import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true},
  hash: String,
  salt: String,
  verifiedSightings: [{
    species: {
      id: {type: Schema.Types.ObjectId, ref: "Species"},
      name: String
    },
    numberOfSightings: Number
  }],
  activeSightings: [{
    id: {type: Schema.Types.ObjectId, ref: "Sighting"},
    species: String,
    image: String,
    verified: Number,
    verifications: [{type: Schema.Types.Mixed}]
  }]
  },
  {timestamps: true}
)

// UserSchema.methods.setPassword = function(password){
//   this.salt = crypto.randomBytes(16).toString('hex');
//   this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
// };

// UserSchema.methods.validPassword = function(password) {
//   var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');

//   return this.hash === hash;
// };

export default mongoose.models.User || mongoose.model('User', UserSchema);