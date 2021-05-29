// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "../../utils/dbConnect";
import Test from "../../models/Test";

export default async (req, res) => {

  await dbConnect();
  const newTest = new Test({name: "John Doe"});
  await newTest.save();

  res.status(200).json({ name: 'John Doe' })
}
