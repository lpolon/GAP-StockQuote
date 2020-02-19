// TODO: pass-in option object

function main() {
  const symbolIndexObj = getSymbolsFromDoc();
  const { docId } = options;
  const body = DocumentApp.openById(docId).getBody();
  Object.keys(symbolIndexObj).forEach((key) =>
    body.replaceText(key, symbolIndexObj[key])
  );
}

function getSymbolsFromDoc() {
  const symbolIndexObj = lookupSymbolInfo();

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
  Object.keys(foundSymbols).forEach((key) => {
    if (symbolIndexObj.hasOwnProperty(key)) {
      const formattedValue = formatStockQuoteString(symbolIndexObj[key]);
      foundSymbols[key] = formattedValue;
    }
  });
  return foundSymbols;
}

function lookupSymbolInfo() {
  const {
    ssId,
    sheetName,
    firstRow,
    firstColumn,
    SymbolHeaderName,
    CurrentPriceHeaderName,
  } = options.sheetInfo;
  const tableValues = getTableValues(ssId, sheetName, firstRow, firstColumn);
  const filteredTable = filterTableColumns(tableValues, [
    SymbolHeaderName,
    CurrentPriceHeaderName,
  ]);
  const symbolIndexObj = StringArrayOfArraysToArrayOfObjectsParser(
    filteredTable
  );
  return symbolIndexObj;
}

function formatStockQuoteString(string) {
  const stringArr = string.split(' ');
  const firstElement = Number(stringArr[0]).toFixed(2);
  let secondElement = stringArr[1].slice(1, -1);
  if (secondElement[0] === '-') {
    secondElement = secondElement.replace('-', '▼');
  } else {
    secondElement = String(`▲${secondElement}`);
  }
  return `[${firstElement} ${secondElement}]`;
}
