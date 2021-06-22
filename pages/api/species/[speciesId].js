import dbConnect from "../../../utils/dbConnect";
import Species from "../../../models/Species";

export default async (req, res) => {
  await dbConnect();
  const { speciesId } = req.query;
  const speciesForSearch = await Species.findById(speciesId).exec();
  if (!speciesForSearch) {
    res.status(404).send("No species with that id found");
  }
  res.status(200).json(speciesForSearch);
}