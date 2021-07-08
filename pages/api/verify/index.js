import { getSession } from 'next-auth/client';
import Sighting from '../../../models/Sighting';
import dbConnect from '../../../utils/dbConnect';

export default async (req, res) => {
  await dbConnect();
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('Must be authenticated');
  }
  const sightingNeedingVerification = await Sighting.findOne({
    verified: 'PENDING',
    user: { $ne: session.user.id },
  }).exec();
  res
    .status(200)
    .json(sightingNeedingVerification ? [sightingNeedingVerification] : []);
};
