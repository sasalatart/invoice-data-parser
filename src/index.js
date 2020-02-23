// eslint-disable-next-line no-unused-vars
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("SII")
    .addItem("Transformar", "parse")
    .addToUi();
}

// eslint-disable-next-line no-unused-vars
function parse() {
  let valuesGenerator;
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("in");
    if (!sheet) throw new NoInputSheetFoundError();

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

  // eslint-disable-next-line no-console
  console.log(finalValues);
}
