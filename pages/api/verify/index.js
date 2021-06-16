import Sighting from "../../../models/Sighting";
import dbConnect from "../../../utils/dbConnect"

export default async (req, res) => {
  await dbConnect();
  const sightingNeedingVerification = await Sighting.findOne({verified: "PENDING"}).exec();
  res.status(200).json(sightingNeedingVerification);
}