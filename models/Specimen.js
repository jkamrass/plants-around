import mongoose, { Schema } from "mongoose";
import pointSchema from "./PointSchema";

const SpecimenSchema = new mongoose.Schema({
  species: {
    id: {type: Schema.Types.ObjectId, required: true, ref: "Species"},
    name: String,
    thumbnail: String
  },
  location: {type: pointSchema, required: true},
  image: String,
  numberOfSighting: {type: number, required: true},
  lastSightedAt: {type: Date, required: true},
  },
  {timestamps: true}
)

export default mongoose.models.Specimen || mongoose.model('Specimen', SpecimenSchema);