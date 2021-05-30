import mongoose, { Schema } from "mongoose";

const SpeciesSchema = new mongoose.Schema({
  commonName: String,
  scientificName: {type: String, required: true},
  specimens: [{type: Schema.Types.ObjectId, ref: "Specimen"}],
  pictureUrls: {main: String, list: [String]},
  links: [String],
  identificationNotes: String,
  createdAt: {type: Date, required: true, immutable: true}
})

export default mongoose.models.Species || mongoose.model('Species', SpeciesSchema);