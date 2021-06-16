const GSheetReader = require('g-sheets-api');
import Sighting from "../../../models/Sighting";
import Species from "../../../models/Species";
import Specimen from "../../../models/Specimen";
import dbConnect from "../../../utils/dbConnect";
import googleSheetReader from "../../../utils/gSheetsImport";

const speciesToImport = [{name: "Common Fig", fallingFruitTerm: "fig"}, {name: "Blackberry", fallingFruitTerm: "blackberry"}, {name: "Pecan", fallingFruitTerm: "pecan"}]

export default async (req, res) => {
  await dbConnect();
  await Specimen.deleteMany({});
  await Sighting.deleteMany({});
  const fallingFruitData = await googleSheetReader("1tFhFxheTnWcro1F35kF0_kJCF-xsxuP4IruW1ulyue4");

  for (let i = 0; i < speciesToImport.length; i++) {
    const sightingsList = fallingFruitData.filter((sighting) => sighting.types.toLowerCase().includes(`${speciesToImport[i].fallingFruitTerm}`));
    const speciesForSighting = await Species.findOne({name: speciesToImport[i].name}, "name images").exec();
    await sightingsList.forEach(sighting => {
      const newSighting = new Sighting();
      newSighting.species = {_id: speciesForSighting._id, name: speciesForSighting.name, thumbnail: speciesForSighting.images.thumbnail};
      newSighting.verified = "TRUE";
      newSighting.verifications = [{source: "falling fruit"}]
      newSighting.location = {
        type: "Point",
        coordinates: [sighting.lng, sighting.lat]
      }
    
      const newSpecimen = new Specimen();
      newSpecimen.location = newSighting.location;
      newSpecimen.species = {_id: speciesForSighting._id, name: speciesForSighting.name, thumbnail: speciesForSighting.images.thumbnail};
      newSpecimen.numberOfSightings = 1;
      newSpecimen.lastSightedAt = new Date();
    
      newSighting.specimen = newSpecimen;
    
      newSighting.save();
      newSpecimen.save();
    }) 
  }
  res.status(200).json("Falling Fruits Data added successfully");
}
