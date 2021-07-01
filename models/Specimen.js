import mongoose, { Schema } from 'mongoose';
import pointSchema from './pointSchema';

const SpecimenSchema = new mongoose.Schema(
  {
    species: {
      _id: { type: Schema.Types.ObjectId, required: true, ref: 'Species' },
      name: String,
      thumbnail: String,
    },
    location: { type: pointSchema, required: true },
    image: String,
    numberOfSightings: { type: Number, required: true },
    lastSightedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Specimen ||
  mongoose.model('Specimen', SpecimenSchema);
