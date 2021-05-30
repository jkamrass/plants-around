import mongoose from "mongoose";
import pointSchema from "./PointSchema";

const SpecimenSchema = new mongoose.Schema({
  species: {type: String, required: true}, // TO-DO: Update as reference with species schema
  location: {type: pointSchema, required: true},
  unverified: Boolean,
  picture: String,
  createdAt: {type: Date, required: true},
  userFoundBy: String //TO-DO: Update as reference to particular user
})

export default mongoose.models.Specimen || mongoose.model('Specimen', SpecimenSchema);