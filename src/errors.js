/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */

function handleError(error, humanMessage) {
  Browser.msgBox("Error", humanMessage || error.message, Browser.Buttons.OK);
  // eslint-disable-next-line no-console
  console.error(error);
}

class NoInputSheetFoundError extends Error {
  constructor(message = "No se encontró la hoja de entrada de datos") {
    super(message);
    this.name = "NoInputSheetFoundError";
  }
}

class HeadersNotFoundError extends Error {
  constructor(
    message = "Algunos títulos no se encontraron. Verifique que estén presentes en la hoja de datos."
  ) {
    super(message);
    this.name = "HeadersNotFoundError";
  }
}
