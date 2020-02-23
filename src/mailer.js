// eslint-disable-next-line no-unused-vars
function sendResults(spreadsheet) {
  const [spreadsheetURL] = spreadsheet.getUrl().split("/edit");
  const blob = UrlFetchApp.fetch(`${spreadsheetURL}/export?format=xlsx`, {
    method: "get",
    headers: { Authorization: `Bearer ${ScriptApp.getOAuthToken()}` }
  }).getBlob();
  blob.setName("out.xlsx");

  MailApp.sendEmail({
    to: Session.getActiveUser().getEmail(),
    subject: "Resultados de facturas",
    attachments: [blob]
  });
}
