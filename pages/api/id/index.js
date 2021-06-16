import Sighting from "../../../models/Sighting";
import Species from "../../../models/Species";
import Specimen from "../../../models/Specimen";
import getPlantNetIdResults from "../../../utils/getPlantNetIdResults";
import dbConnect from "../../../utils/dbConnect";

export default async (req, res) => {
  if (req.method === "POST") {
    await dbConnect();
    const speciesForSighting = await Species.findById(req.body.species);
    // Request validation
    // Check to make sure species id is valid
    if (!speciesForSighting) {
      return res.status(404).send("No species with that id found");
    }
    // Check to make sure images and plant organs are valid
    if (!req.body.images) {
      return res.status(400).send("Must include images");
    }
    // Check to make sure the location is valid

    // Create the new document for this sighting
    const newSighting = new Sighting();
    newSighting.species = speciesForSighting;
    newSighting.location = {
      type: "Point",
      coordinates: [Number(req.body.location.longitude), Number(req.body.location.latitude)]
    };
    // Add images to sighting
    newSighting.images = req.body.images;

    // Test for plant net:
    //const imagesToId = [{imageUrl: "https://res.cloudinary.com/dk4lsu1uf/image/upload/v1623763521/Test%20Id%20Photos/Fig_Test.jpg", organ: "leaf"}];
    // Send the results to plant net to identify
    const plantNetIdResponse = await getPlantNetIdResults(req.body.images);
    const speciesMatch = plantNetIdResponse.data.results.find((possibleSpeciesMatch) => possibleSpeciesMatch.species.scientificNameWithoutAuthor === speciesForSighting.scientificName)
    const plantNetVerification = {source: "Plant Net", matchScore: speciesMatch ? speciesMatch.score : 0};

    newSighting.verifications = [plantNetVerification];
    newSighting.verified = plantNetVerification.matchScore >= .5 ? "TRUE" : "PENDING";
    // Create a new specimen if the sighting is verified
    // TO-DO: Check if the sighting is already at a specimen location
    if(newSighting.verified === "TRUE") {
      // Checks to see if the sighting is of (very close to) an existing specimen (Currently checks for a specimen within 10 meters of sighting);
      let specimenForSighting = await Specimen.findOne({
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: newSighting.location.coordinates
            },
            $maxDistance: 10
          }
        },
        "species._id": newSighting.species._id})
        .exec()
      console.log(specimenForSighting)
      // If so, it just updates the specimen. If not, a new specimen is created at the location of the sighting.
      if (specimenForSighting) {
        specimenForSighting.numberOfSightings += 1;
      } else {
        specimenForSighting = new Specimen();
        specimenForSighting.location = newSighting.location;
        specimenForSighting.species = {_id: speciesForSighting._id, name: speciesForSighting.name, thumbnail: speciesForSighting.images.thumbnail};
        specimenForSighting.numberOfSightings = 1;
      }
      specimenForSighting.lastSightedAt = new Date();
      newSighting.specimen = specimenForSighting;
      await specimenForSighting.save();
    }

    const savedSighting = await newSighting.save();

    // Respond to the user either that their sighting is verified or it has been sent to be seen by a moderator
    return res.status(200).json({verified: savedSighting.verified});
  }
  res.status(405).send("Must be a POST request");
}


// Request from client should be of the form:
// {
//   species: "id Number",
//   images: [{
//     imageUrl: "Cloudinary Url",
//     plantOrganInPhoto: "One of the valid plant types"
//   }],
//   location: {
//     longitude: Number,
//     latitude: Number
//   }
// }