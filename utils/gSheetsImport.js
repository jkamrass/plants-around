const GSheetReader = require('g-sheets-api');

const googleSheetReader = async (sheetId) => {
  const options = {
    sheetId,
  };
  let results;
  await GSheetReader(
    options,
    (importResults) => {
      results = importResults;
    },
    (error) => {
      results = error;
    }
  );
  return results;
};

export default googleSheetReader;
