import mongoose, { Schema } from "mongoose";
import pointSchema from "./pointSchema";

const SightingSchema = new mongoose.Schema({
  species: {
    _id: {type: Schema.Types.ObjectId, required: true, ref: "Species"},
    name: String,
    thumbnail: String
  },
  user: {type: Schema.Types.ObjectId, ref: "User"},
  specimen: {type: Schema.Types.ObjectId, ref: "Specimen"},
  location: {type: pointSchema, required: true},
  verified: {type: String, required: true},
  verifications: [{type: Schema.Types.Mixed}],
  images: [{
    imageUrl: String,
    organ: String
  }],
  },
  {timestamps: true}
)

export default mongoose.models.Sighting || mongoose.model('Sighting', SightingSchema);