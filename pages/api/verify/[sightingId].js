import { getSession } from 'next-auth/client';
import Sighting from '../../../models/Sighting';
import dbConnect from '../../../utils/dbConnect';
import updateSpecimensWithVerifiedSighting from '../../../utils/updateSpecimensWithVerifiedSighting';

// This endpoint updates the verified status of a sighting on the basis of a moderator's input. If the moderator confirms the sighting, then the specimen collection is updated to reflect the newly confirmed sighting.
export default async (req, res) => {
  const { sightingId } = req.query;
  const { moderatorInput } = req.body;
  await dbConnect();
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send('Must be authenticated');
  }
  let sightingMatch = null;
  try {
    sightingMatch = await Sighting.findById(sightingId).exec();
  } catch (error) {
    return res.status(404).send('No sighting with that id found');
  }

  // Check to make sure a valid sightingId was given
  if (!sightingMatch) {
    return res.status(404).send('No sighting with that id found');
  }
  // Check to make sure a valid moderator input was given
  if (![-1, 0, 1].includes(Number(moderatorInput))) {
    return res.status(400).send('Must provide valid moderator input');
  }

  const newVerification = {
    source: 'moderator',
    user: session.user.id,
    verified: Number(moderatorInput),
  };
  sightingMatch.verifications.push(newVerification);

  switch (Number(moderatorInput)) {
    case 1:
      sightingMatch.verified = 'TRUE';
      sightingMatch.specimen = await updateSpecimensWithVerifiedSighting(
        sightingMatch
      );
      break;
    case 0:
      // No change to status since moderator selected "unsure"
      break;
    case -1:
      sightingMatch.verified = 'FALSE';
      break;
    default:
      break;
  }

  await sightingMatch.save();
  return res.status(200).send('Sighting Updated');
};
