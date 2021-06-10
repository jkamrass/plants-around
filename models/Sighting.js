import mongoose, { Schema } from "mongoose";
import pointSchema from "./PointSchema";

const SightingSchema = new mongoose.Schema({
  species: {
    id: {type: Schema.Types.ObjectId, required: true, ref: "Species"},
    name: String,
  },
  user: {type: Schema.Types.ObjectId, required: true, ref: "User"},
  specimen: {type: Schema.Types.ObjectId, ref: "Specimen"},
  location: {type: pointSchema, required: true},
  verified: {type: Number, required: true},
  verifications: [{type: Schema.Types.Mixed}],
  images: [String],
  },
  {timestamps: true}
)

export default mongoose.models.Sighting || mongoose.model('Sighting', SightingSchema);