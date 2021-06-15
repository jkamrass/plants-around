import Sighting from "../../../models/Sighting";
import Species from "../../../models/Species";
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
    // // Check to make sure images and plant organs are valid
    // if (!req.body.images) {
    //   return res.status(400).send("Must include images");
    // }
    // Check to make sure the location is valid

    // Create the new document for this sighting
    // const newSighting = new Sighting();
    // newSighting.species = speciesForSighting;
    // newSighting.location = {
    //   type: "Point",
    //   coordinates: [req.body.location.longitude, req.body.location.latitude]
    // }
    // Add images to sighting

    // Test for plant net:
    const imagesToId = [{imageUrl: "https://www.irishtimes.com/polopoly_fs/1.3997665.1566828860!/image/image.jpg", organ: "leaf"}]
    // Send the results to plant net to identify
    const plantNetIdResponse = await getPlantNetIdResults(imagesToId);
    const speciesMatch = plantNetIdResponse.data.results.find((possibleSpeciesMatch) => possibleSpeciesMatch.species.scientificNameWithoutAuthor === speciesForSighting.scientificName)
    const plantNetVerification = {source: "Plant Net", matchScore: speciesMatch ? speciesMatch.score : 0};
    //plantNetVerification.matchScore = speciesMatch ? speciesMatch.score : 0;
    // Check if plant net id matches with the species

    // Respond to the user either that their sighting is verified or it has been sent to be seen by a moderator

    // newSighting.user = "";
    // newSighting.verified = "TRUE";
    // newSighting.verifications = [{source: "falling fruit"}]
    // newSighting.us
    return res.status(200).json("It worked");
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