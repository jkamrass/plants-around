import { getSession } from 'next-auth/client';
import Sighting from '../../../../models/Sighting';
import dbConnect from '../../../../utils/dbConnect';

export default async (req, res) => {
  await dbConnect();
  const session = await getSession({ req });
  const recentSightings = await Sighting.find({ user: session.user.id })
    .sort({ createdAt: -1 })
    .limit(5)
    .exec();
  res.status(200).json(recentSightings);
};
