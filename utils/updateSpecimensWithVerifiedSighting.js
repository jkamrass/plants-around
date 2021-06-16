import Specimen from "../models/Specimen";

// Updates the specimens collection by either updating an exisisting specimen at the sighting location or creating a new specimen at that location
const updateSpecimensWithVerifiedSighting = async (verifiedSighting) => {
  // Checks to see if the sighting is of (very close to) an existing specimen (Currently checks for a specimen within 10 meters of sighting);
  let specimenForSighting = await Specimen.findOne({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: verifiedSighting.location.coordinates
        },
        $maxDistance: 10
      }
    },
    "species._id": verifiedSighting.species._id})
    .exec();
  // If so, it just updates the specimen. If not, a new specimen is created at the location of the sighting.
  if (specimenForSighting) {
    specimenForSighting.numberOfSightings += 1;
  } else {
    specimenForSighting = new Specimen();
    specimenForSighting.location = verifiedSighting.location;
    specimenForSighting.species = verifiedSighting.species;
    specimenForSighting.numberOfSightings = 1;
  }
  specimenForSighting.lastSightedAt = new Date();
  return await specimenForSighting.save();
}

export default updateSpecimensWithVerifiedSighting;