const UPPER_HEADERS = [
  "TipoDTE",
  "Folio",
  "FechaEmision",
  "TipoDespacho",
  "RutEmisor",
  "RazonSocialEmisor"
];

const LOWER_HEADERS = ["Descripcion", "Cantidad", "Precio"];

function areEqual(value, expectedValue) {
  return typeof value === "string"
    ? value.toUpperCase() === expectedValue.toUpperCase()
    : value === expectedValue;
}

// eslint-disable-next-line no-unused-vars
function isUpperHeader(row, upperIndices) {
  if (!row) return false;

  return upperIndices.every((mappedIndex, index) =>
    areEqual(row[mappedIndex], UPPER_HEADERS[index])
  );
}

function generateIndicesForHeaders(expectedHeaders, row) {
  const headersNotFound = [];

  const indices = expectedHeaders.map(expectedHeader => {
    const index = row.findIndex(value => areEqual(value, expectedHeader));
    if (index < 0) {
      headersNotFound.push(expectedHeader);
    }
    return index;
  });

  if (headersNotFound.length > 0) {
    throw new HeadersNotFoundError(headersNotFound);
  }

  return indices;
}

function findRowForHeaders(rangeValues, expectedHeaders) {
  const firstHeaderRow = rangeValues.find(row =>
    row.find(header => areEqual(header, expectedHeaders[0]))
  );

  if (!firstHeaderRow) {
    throw new HeadersNotFoundError(expectedHeaders);
  }

  return firstHeaderRow;
}

// eslint-disable-next-line no-unused-vars
function getHeadersToIndices(rangeValues) {
  const upperHeadersRow = findRowForHeaders(rangeValues, UPPER_HEADERS);
  const lowerHeadersRow = findRowForHeaders(rangeValues, LOWER_HEADERS);

  return {
    upperIndices: generateIndicesForHeaders(UPPER_HEADERS, upperHeadersRow),
    lowerIndices: generateIndicesForHeaders(LOWER_HEADERS, lowerHeadersRow)
  };
}
