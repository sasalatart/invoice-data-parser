/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */

function handleError(error, humanMessage) {
  Browser.msgBox("Error", humanMessage || error.message, Browser.Buttons.OK);
  // eslint-disable-next-line no-console
  console.error(error);
}

class NoInputSheetFoundError extends Error {
  constructor(sheetName = INPUT_SHEET_NAME) {
    const message = `No se encontró la hoja de entrada de datos ("${sheetName}")`;
    super(message);
    this.name = "NoInputSheetFoundError";
  }
}

class HeadersNotFoundError extends Error {
  constructor(headers = []) {
    const stringifiedHeaders = headers.join(", ");
    const message = `Algunos títulos no se encontraron: ${stringifiedHeaders}`;
    super(message);
    this.name = "HeadersNotFoundError";
  }
}
