const GSheetReader = require('g-sheets-api');
import Sighting from "../../../models/Sighting";
import Species from "../../../models/Species";
import Specimen from "../../../models/Specimen";
import dbConnect from "../../../utils/dbConnect";
import googleSheetReader from "../../../utils/gSheetsImport";

export default async (req, res) => {
  await dbConnect();
  await Specimen.deleteMany({});
  await Sighting.deleteMany({});
  const fallingFruitData = await googleSheetReader("1tFhFxheTnWcro1F35kF0_kJCF-xsxuP4IruW1ulyue4");
  const figsList = fallingFruitData.filter((specimen) => specimen.types.toLowerCase().includes("fig"));
  const speciesForSighting = await Species.findOne({name: "Common Fig"}, "name images").exec();
  for (let i = 0; i < 20; i++) {
    const newSighting = new Sighting();
    newSighting.species = speciesForSighting;
    newSighting.verified = "TRUE";
    newSighting.verifications = [{source: "falling fruit"}]
    newSighting.location = {
      type: "Point",
      coordinates: [figsList[i].lng, figsList[i].lat]
    }
  
    const newSpecimen = new Specimen();
    newSpecimen.location = newSighting.location;
    newSpecimen.species = {_id: speciesForSighting._id, name: speciesForSighting.name, thumbnail: speciesForSighting.images.thumbnail};
    newSpecimen.numberOfSightings = 1;
    newSpecimen.lastSightedAt = new Date();
  
    newSighting.specimen = newSpecimen;
  
    await newSighting.save();
    await newSpecimen.save();
  }

  res.status(200).json("Falling Fruits Data added successfully");
}
