function onOpen() {
  const currentDocument = DocumentApp.getActive();
  const menuItems = [
    { name: 'get stock quotes', functionName: 'main' },
  ];
  currentDocument.addMenu('Scripts', menuItems);
}

function main() {
  const symbolIndexObj = getSymbolsFromDoc();
  const { docId } = options;
  const body = DocumentApp.openById(docId).getBody();
  Object.keys(symbolIndexObj).forEach((key) =>
    body.replaceText(key, symbolIndexObj[key])
  );
}

function getSymbolsFromDoc() {
  const symbolTableObj = lookupSymbolInfo();

  const { docId } = options;
  const body = DocumentApp.openById(docId).getBody();
  const paragraphsArr = body.getParagraphs();
  const foundSymbols = {};
  paragraphsArr.forEach((e) => {
    const parText = e.getText();
    parText.split(' ').forEach((word) => {
      if (word.includes('&') && word.length > 1) {
        // aqui eu preciso criar a key, mas com &
        foundSymbols[word] = null;
      }
    });
  });

  Object.keys(foundSymbols).forEach((key) => {
    const triggerKey = key.substring(1);
    if (symbolTableObj.hasOwnProperty(triggerKey)) {
      const formattedValue = formatStockQuoteString(
        triggerKey,
        symbolTableObj[triggerKey]
      );
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

function formatStockQuoteString(triggerKey, string) {
  const stringArr = string.split(' ');
  const firstElement = Number(stringArr[0]).toFixed(2);
  let secondElement = stringArr[1].slice(1, -1);
  if (secondElement[0] === '-') {
    secondElement = secondElement.replace('-', '▼');
  } else {
    secondElement = String(`▲${secondElement}`);
  }
  return `[${triggerKey} ${firstElement} ${secondElement}]`;
}
