import Sighting from '../../models/Sighting';
import User from '../../models/User';
import dbConnect from '../../utils/dbConnect';

export default async (req, res) => {
  await dbConnect();
  const user = await User.findOne({ username: req.body.username }).exec();
  if (!user) {
    return res.status(404).send('user not found');
  }
  const recentSightings = await Sighting.find({ user })
    .sort({ createdAt: -1 })
    .limit(5)
    .exec();
  const response = {
    _id: user._id,
    username: user.username,
    verifiedSightings: user.verifiedSightings,
    recentSightings,
  };
  res.status(200).json(response);
};
