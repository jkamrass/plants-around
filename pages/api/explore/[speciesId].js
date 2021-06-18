import dbConnect from "../../../utils/dbConnect";
import Specimen from "../../../models/Specimen";

export default async (req, res) => {
  await dbConnect();
  const { speciesId, long, lat, distance } = req.query;
  const searchLocation = [Number(long || -78.92876857), Number(lat || 36.01385727)];
  const radiusOfSearchInMiles = 5;

  const specimensMatchingSearch = await Specimen.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: searchLocation
        },
        $maxDistance: 8046
      }
    },
    "species._id": speciesId})
    .exec()
  res.status(200).json(specimensMatchingSearch);
}