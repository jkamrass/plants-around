import Sighting from "../../../../models/Sighting";
import dbConnect from "../../../../utils/dbConnect"

export default async (req, res) => {
  await dbConnect();
  const { userId } = req.query;
  const recentSightings = await Sighting.find({user: userId}).sort({createdAt: -1}).limit(5).exec();
  res.status(200).json(recentSightings);
}