import Species from '../../../models/Species';
import dbConnect from '../../../utils/dbConnect';

export default async (req, res) => {
  if (req.method === 'POST') {
    await dbConnect();
    // Process a POST request
  } else {
    // Handle any other HTTP method
  }
  await dbConnect();
  const newSpeciesInfo = {
    name: 'Blackberry',
    scientificName: 'Rubus allegheniensis',
  };
  const newSpecies = new Species(newSpeciesInfo);
  newSpecies.scientificNameNormalized = newSpecies.scientificName.toLowerCase();
  const savedSpecies = await newSpecies.save();
  res.status(200).json(`${savedSpecies.name} was added`);
};
