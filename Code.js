function getSymbolsFromDoc() {
  const { docId } = options;
  const body = DocumentApp.openById(docId).getBody();
  const paragraphsArr = body.getParagraphs();
  const foundSymbols = {};
  paragraphsArr.forEach((e) => {
    const parText = e.getText();
    parText.split(' ').forEach((word) => {
      if (word.includes('&') && word.length > 1) {
        foundSymbols[word.substring(1)] = null;
      }
    });
  });
  return foundSymbols;
}

function lookupSymbolInfo(key) {
  const {ssId, sheetName} = options.sheetInfo
  const tableValues = getTableValues(ssId, sheetName, 1, 1);
  Logger.log(tableValues);
}
