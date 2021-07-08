import Sighting from '../models/Sighting';
import Specimen from '../models/Specimen';
import getPlantNetIdResults from './getPlantNetIdResults';

const createNewSighting = async (species, location, user, images) => {
  const newSighting = new Sighting();
  newSighting.species = {
    _id: species._id,
    name: species.name,
    thumbnail: species.images.thumbnail,
  };
  newSighting.location = {
    type: 'Point',
    coordinates: [Number(location.longitude), Number(location.latitude)],
  };
  newSighting.images = images;
  newSighting.user = user.id;

  // Test for plant net:
  // 1. Send the results to plant net to identify
  const plantNetIdResponse = await getPlantNetIdResults(images);
  // Searches the plant net results to see if the selected species is one of the returned possible match species
  const speciesMatch = plantNetIdResponse.data.results.find(
    (possibleSpeciesMatch) =>
      possibleSpeciesMatch.species.scientificNameWithoutAuthor ===
      species.scientificName
  );
  const plantNetVerification = {
    source: 'Plant Net',
    matchScore: speciesMatch ? speciesMatch.score : 0,
  };

  // 2. Add the results of the plant net search to the verifications array for the sighting
  newSighting.verifications = [plantNetVerification];
  newSighting.verified =
    plantNetVerification.matchScore >= 0.5 ? 'TRUE' : 'PENDING';
  // 3. Create a new specimen if the sighting is verified
  if (newSighting.verified === 'TRUE') {
    // Checks to see if the sighting is of (very close to) an existing specimen (Currently checks for a specimen within 10 meters of sighting);
    let specimenForSighting = await Specimen.findOne({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: newSighting.location.coordinates,
          },
          $maxDistance: 10,
        },
      },
      'species._id': newSighting.species._id,
    }).exec();
    // If there is a nearby specimen, it just updates the specimen. If not, a new specimen is created at the location of the sighting.
    if (specimenForSighting) {
      specimenForSighting.numberOfSightings += 1;
    } else {
      specimenForSighting = new Specimen();
      specimenForSighting.location = newSighting.location;
      specimenForSighting.species = {
        _id: species._id,
        name: species.name,
        thumbnail: species.images.thumbnail,
      };
      specimenForSighting.numberOfSightings = 1;
    }
    specimenForSighting.lastSightedAt = new Date();
    newSighting.specimen = specimenForSighting;
    await specimenForSighting.save();
  }

  const savedSighting = await newSighting.save();
  return savedSighting;
};

export default createNewSighting;
