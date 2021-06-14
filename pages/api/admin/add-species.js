import Species from "../../../models/Species";
import dbConnect from "../../../utils/dbConnect";

export default async (req, res) => {
  await dbConnect();
  const newSpeciesInfo = {
    name: req.body.name,
    scientificName : req.body.scientificName,
    images: {
      thumbnail: req.body.thumbnail
    }
  }
  const newSpecies = new Species(newSpeciesInfo);
  newSpecies.scientificNameNormalized = newSpecies.scientificName.toLowerCase();
  const savedSpecies = await newSpecies.save();
  res.status(200).json(`${savedSpecies.name} was added`)
}

//Species Added:
// {
//   name: "Common Fig",
//   scientificName : "Ficus carica"
// }
// Blackberry