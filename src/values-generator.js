// eslint-disable-next-line no-unused-vars
function* makeValuesGenerator(rangeValues) {
  const { upperIndexes, lowerIndexes } = getHeadersToIndexes(rangeValues);

  let currentIndex = 0;

  while (currentIndex < rangeValues.length) {
    // Skip the row containing upper headers...
    currentIndex += 1;

    const rawUpperRow = rangeValues[currentIndex];
    const upperRow = upperIndexes.map(index => rawUpperRow[index]);

    // Skip the row we just added, and the row next to it containing lower headers...
    currentIndex += 2;

    const lowerRows = [];
    while (!isUpperHeader(rangeValues[currentIndex], upperIndexes)) {
      const currentRow = rangeValues[currentIndex];

      if (!currentRow) {
        yield { upperRow, lowerRows };
        return;
      }

      lowerRows.push(lowerIndexes.map(lowerIndex => currentRow[lowerIndex]));
      currentIndex += 1;
    }

    yield {
      upperRow,
      lowerRows: lowerRows.slice(0, lowerRows.length - 1) // Remove the final blank line after lowers
    };
  }
}
