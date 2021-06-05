import dbConnect from "../../../utils/dbConnect";
import Test from "../../../models/Test";

export default async (req, res) => {

  await dbConnect();
  const allTests = await Test.find({}).exec();
  res.status(200).json(allTests);
}