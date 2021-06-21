import dbConnect from "../../../utils/dbConnect";
import Specimen from "../../../models/Specimen";

export default async (req, res) => {
  // Check if search Location provided
  await dbConnect();
  const {long, lat, dist} = req.query;
  const searchLocation = [Number(long || -78.92876857), Number(lat || 36.01385727)];
  const radiusOfSearchInMiles = dist && Number(dist) ? Number(dist) : 5;
  // const nearbySpecimens = await Specimen.find({
  //   location: {
  //     $near: {
  //       $geometry: {
  //         type: "Point",
  //         coordinates: searchLocation
  //       },
  //       $maxDistance: 3000
  //     }
  //   }
  //   },
  //   "species"
  // )
  const nearbySpecies = await Specimen.aggregate([
    {$match: {
      location: {
        $geoWithin: {
          // converts the distance from miles to radians by dividing by the approximate equatorial radius of the earth, 3963.2 miles
          $centerSphere: [searchLocation, radiusOfSearchInMiles/3963.2]
        }
      }
    }},
    {$group: {_id: "$species", numberOfSightings: {$sum: "$numberOfSightings"}}},
    {$sort: {numberOfSightings: -1}}
  ])
  res.status(200).json(nearbySpecies);
}