import { getSession } from 'next-auth/client';
import Sighting from '../../../models/Sighting';
import dbConnect from '../../../utils/dbConnect';

export default async (req, res) => {
  await dbConnect();
  const session = await getSession({ req });
  const sightingNeedingVerification = await Sighting.findOne({
    verified: 'PENDING',
  }).exec();
  res
    .status(200)
    .json(sightingNeedingVerification ? [sightingNeedingVerification] : []);
};
