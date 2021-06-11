import Species from "../../../models/Species";
import dbConnect from "../../../utils/dbConnect";

export default async (req, res) => {
  await dbConnect();
  const fig = {
    name: "Common Fig",
    scientificName : "Ficus carica"
  }
  const newSpecies = new Species(fig);
  newSpecies.scientificNameNormalized = newSpecies.scientificName.toLowerCase();
  const savedSpecies = await newSpecies.save();
  res.status(200).json(`${savedSpecies.name} was added`)
}