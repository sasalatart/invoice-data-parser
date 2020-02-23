const UPPER_HEADERS = [
  "TipoDTE",
  "Folio",
  "FechaEmision",
  "TipoDespacho",
  "RutReceptor",
  "RazonSocialReceptor",
  "Acteco"
];

const LOWER_HEADERS = ["Descripcion", "Cantidad", "Precio"];

function areEqual(value, expectedValue) {
  return typeof value === "string"
    ? value.toUpperCase() === expectedValue.toUpperCase()
    : value === expectedValue;
}

// eslint-disable-next-line no-unused-vars
function isUpperHeader(row, upperIndexes) {
  if (!row) return false;

  return upperIndexes.every((mappedIndex, index) =>
    areEqual(row[mappedIndex], UPPER_HEADERS[index])
  );
}

function mapToIndex(expectedHeaders, values) {
  const indexes = expectedHeaders.map(header =>
    values.findIndex(value => areEqual(value, header))
  );

  if (indexes.some(index => index < 0)) throw new HeadersNotFoundError();

  return indexes;
}

function findFirstHeaderRow(rangeValues, posHeaders) {
  const firstHeaderRow = rangeValues.find(row =>
    row.find(header => areEqual(header, posHeaders[0]))
  );
  if (!firstHeaderRow) throw new HeadersNotFoundError();
  return firstHeaderRow;
}

// eslint-disable-next-line no-unused-vars
function getHeadersToIndexes(rangeValues) {
  const firstUpperHeadersRow = findFirstHeaderRow(rangeValues, UPPER_HEADERS);
  const firstLowerHeadersRow = findFirstHeaderRow(rangeValues, LOWER_HEADERS);

  return {
    upperIndexes: mapToIndex(UPPER_HEADERS, firstUpperHeadersRow),
    lowerIndexes: mapToIndex(LOWER_HEADERS, firstLowerHeadersRow)
  };
}
