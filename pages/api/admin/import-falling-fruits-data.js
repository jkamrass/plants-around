const GSheetReader = require('g-sheets-api');
import dbConnect from "../../../utils/dbConnect";
import googleSheetReader from "../../../utils/gSheetsImport";

export default async (req, res) => {
  await dbConnect();
  const fallingFruitData = await googleSheetReader("1tFhFxheTnWcro1F35kF0_kJCF-xsxuP4IruW1ulyue4");
  const figsList = fallingFruitData.filter((specimen) => specimen.types.toLowerCase().includes("fig"));
  
  res.status(200).json("Falling Fruits Data added successfully");
}
