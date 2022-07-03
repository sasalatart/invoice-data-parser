const INPUT_SHEET_NAME = "data";

// eslint-disable-next-line no-unused-vars
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("SII")
    .addItem("Transformar", "parse")
    .addToUi();
}

function setFinalValues(sheet, finalValues) {
  sheet
    .getDataRange()
    .clearFormat()
    .clearContent();

  sheet
    .getRange(1, 1, finalValues.length, finalValues[0].length)
    .setValues(finalValues);

  SpreadsheetApp.flush();
}

// eslint-disable-next-line no-unused-vars
function parse() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  let sheet;
  let valuesGenerator;
  try {
    sheet = spreadsheet.getSheetByName(INPUT_SHEET_NAME);
    if (!sheet) throw new NoInputSheetFoundError(INPUT_SHEET_NAME);

    const displayValues = sheet.getDataRange().getDisplayValues();
    valuesGenerator = makeValuesGenerator(displayValues);
  } catch (err) {
    handleError(err);
    return;
  }

  const finalValues = [UPPER_HEADERS.concat(LOWER_HEADERS)];
  let nextValue = valuesGenerator.next();
  while (!nextValue.done) {
    const { upperRow, lowerRows } = nextValue.value;
    lowerRows.forEach(lowerRow => {
      finalValues.push(upperRow.concat(lowerRow));
    });
    nextValue = valuesGenerator.next();
  }

  setFinalValues(sheet, finalValues);
  sendResults(spreadsheet);
}
