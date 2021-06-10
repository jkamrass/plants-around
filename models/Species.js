import mongoose, { Schema } from "mongoose";

const SpeciesSchema = new mongoose.Schema({
  name: String,
  scientificName: {type: String, required: true},
  scientificNameNormalized: String,
  images: {
    thumbnail: String,
    images: [String]
  },
  links: [String],
  identificationInformation: String,
  },
  {timestamps: true}
)

export default mongoose.models.Species || mongoose.model('Species', SpeciesSchema);