import Sighting from "../../../models/Sighting";
import Species from "../../../models/Species";
import getPlantNetIdResults from "../../../utils/getPlantNetIdResults";
import dbConnect from "../../../utils/dbConnect";

export default async (req, res) => {
  if (req.method === "POST") {
    // Check to make sure species id is valid
    await dbConnect();
    const speciesForSighting = await Species.findById(req.body.species);
    if (!speciesForSighting) {
      return res.status(404).send("No species with that id found");
    }
    if (!req.body.images) {
      return res.status(400).send("Must include images");
    }
    // Create the new document for this sighting
    const newSighting = new Sighting();
    newSighting.species = speciesForSighting;
    newSighting.location = {
      type: "Point",
      coordinates: [req.body.location.longitude, req.body.location.latitude]
    }
    // Add images to sighting
    // Send the results to plant net to identify
    const plantNetIdResponse = await getPlantNetIdResults(req.body.images);
    console.log(plantNetIdResponse);
    // Check if plant net id matches with the species

    // Respond to the user either that their sighting is verified or it has been sent to be seen by a moderator

    // newSighting.user = "";
    // newSighting.verified = "TRUE";
    // newSighting.verifications = [{source: "falling fruit"}]
    // newSighting.us
    res.status(200).json("It worked");
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