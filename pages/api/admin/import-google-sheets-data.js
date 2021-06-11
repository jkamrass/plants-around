const GSheetReader = require('g-sheets-api');
import dbConnect from "../../../utils/dbConnect";

export default async (req, res) => {
  await dbConnect();
  const options = {
    sheetId: "1tFhFxheTnWcro1F35kF0_kJCF-xsxuP4IruW1ulyue4"
  };
  let fallingFruitData = [];
  await GSheetReader(
    options,
    results => {fallingFruitData = results},
    error => {console.error(error)});
  const figsList = fallingFruitData.filter((specimen) => specimen.types.toLowerCase().includes("fig"));
  
  res.status(200).json({ name: 'John Doe' })
}
