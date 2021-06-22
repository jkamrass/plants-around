import dbConnect from "../../../utils/dbConnect";
import Specimen from "../../../models/Specimen";

export default async (req, res) => {
  await dbConnect();
  const { speciesId, long, lat, type, neLat, neLong, swLat, swLong  } = req.query;
  const searchLocation = [Number(long || -78.92876857), Number(lat || 36.01385727)];
  const radiusOfSearchInMiles = 5;
  if (type === "point") {
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
  if (type === "polygon") {
    const specimensMatchingSearch = await Specimen.find({
      location: {
        $geoWithin: {
          $geometry: {
            type: "Polygon",
            coordinates: [[ [neLong, neLat], [swLong, neLat], [swLong, swLat], [neLong, swLat], [neLong, neLat] ]]
          }
        }
      },
      "species._id": speciesId})
      .exec()
    res.status(200).json(specimensMatchingSearch);
  }
}