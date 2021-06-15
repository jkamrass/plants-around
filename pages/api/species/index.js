import Species from "../../../models/Species";
import dbConnect from "../../../utils/dbConnect"

export default async (req, res) => {
  await dbConnect();
  const speciesList = await Species.find({}, "name").exec();
  res.status(200).json(speciesList);
}