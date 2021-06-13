import dbConnect from "../../../utils/dbConnect";
import Test from "../../../models/Test";
import Specimen from "../../../models/Specimen";

export default async (req, res) => {
  await dbConnect();
  const searchLocation = [-78.92876857, 36.01385727];
  const radiusOfSearchInMiles = 2;
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
  const nearbySpecies = await Specimen.aggregate([
    {$match: {
      location: {
        $geoWithin: {
          // converts the distance from miles to radians by dividing by the approximate equatorial radius of the earth, 3963.2 miles
          $centerSphere: [searchLocation, radiusOfSearchInMiles/3963.2]
        }
      }
    }},
    {$group: {_id: "$species", numberOfSightings: {$sum: "$numberOfSightings"}}}
  ])
  res.status(200).json(nearbySpecies);
}