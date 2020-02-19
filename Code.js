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

function lookupSymbolInfo() {
  const {
    sheetInfo: { ssId, sheetName },
  } = options;
}


function formatStockQuoteString(ticker, trigger) {
  const stringArr = trigger.split(' ');
  const firstElement = Number(stringArr[0]).toFixed(2);
  let secondElement = stringArr[1].slice(1, -1);
  if (secondElement[0] === '-') {
    secondElement = secondElement.replace('-', '▼');
  } else {
    secondElement = String(`▲${secondElement}`);
  }
  return `[${firstElement} ${secondElement}]`;
}