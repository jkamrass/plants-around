import dbConnect from "../../../utils/dbConnect";
import Test from "../../../models/Test";
import Specimen from "../../../models/Specimen";

export default async (req, res) => {
  await dbConnect();
  const searchLocation = [-78.92876857, 36.01385727];
  const nearbySpecimens = await Specimen.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: searchLocation
        },
        $maxDistance: 3000
      }
    }
    },
    "species"
  )
  res.status(200).json(nearbySpecimens);
}