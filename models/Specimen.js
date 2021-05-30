import mongoose, { Schema } from "mongoose";
import pointSchema from "./PointSchema";

const SpecimenSchema = new mongoose.Schema({
  species: {type: Schema.Types.ObjectId, required: true, ref: "Species"},
  location: {type: pointSchema, required: true},
  unverified: {type: Boolean, required: true},
  picture: String,
  createdAt: {type: Date, required: true, immutable: true},
  userFoundBy: String //TO-DO: Update as reference to particular user
})

export default mongoose.models.Specimen || mongoose.model('Specimen', SpecimenSchema);