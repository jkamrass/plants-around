const GSheetReader = require('g-sheets-api');
import dbConnect from "../../utils/dbConnect";

export default async (req, res) => {
  const options = {
    sheetId: "1tFhFxheTnWcro1F35kF0_kJCF-xsxuP4IruW1ulyue4"
  };
  GSheetReader(
    options,
    results => {
      console.log(results)
      // do something with the results here
    },
    error => {
      console.log(error)
      // OPTIONAL: handle errors here
    }
  );
  res.status(200).json({ name: 'John Doe' })
}
