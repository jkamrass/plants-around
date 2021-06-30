import User from '../../models/User';
import dbConnect from '../../utils/dbConnect';

export default async (req, res) => {
  await dbConnect();
  // Check to see if that username is already taken
  const existingUser = await User.findOne({
    username: req.body.username,
  }).exec();
  if (existingUser) {
    return res.status(409).send('Username already taken');
  }
  const newUser = new User();
  newUser.username = req.body.username;
  const savedUser = await newUser.save();
  const response = {
    _id: savedUser._id,
    username: savedUser.username,
    verifiedSightings: savedUser.verifiedSightings,
    recentSightings: [],
  };
  res.status(200).json(response);
};
