import Sighting from "../../../models/Sighting";
import dbConnect from "../../../utils/dbConnect"
import updateSpecimensWithVerifiedSighting from "../../../utils/updateSpecimensWithVerifiedSighting";

export default async (req, res) => {
  const { sightingId } = req.query;
  const { moderatorInput } = req.body;
  await dbConnect();
  let sightingMatch = null;
  try {
    sightingMatch = await Sighting.findById(sightingId).exec();
    console.log("test");
  } catch (error) {
    return res.status(404).send("No sighting with that id found");
  }
  
  // Check to make sure a valid sightingId was given
  if (!sightingMatch) {
    return res.status(404).send("No sighting with that id found");
  }
  // Check to make sure a valid moderator input was given
  if (![-1,0,1].includes(Number(moderatorInput))) {
    return res.status(400).send("Must provide valid moderator input")
  }

  const newVerification = {
    source: "moderator",
    user: "test",
    verified: Number(moderatorInput)
  };
  sightingMatch.verifications.push(newVerification)

  switch (Number(moderatorInput)) {
    case 1:
      sightingMatch.verified = "TRUE";
      const specimenforSighting = await updateSpecimensWithVerifiedSighting(sightingMatch);
      sightingMatch.specimen = specimenforSighting;
      break;
    case 0:
      // No change to status since moderator selected "unsure"
      break;
    case -1:
      sightingMatch.verified = "FALSE";
      break;
  }

  await sightingMatch.save();
  return res.status(200).send("Sighting Updated");
}