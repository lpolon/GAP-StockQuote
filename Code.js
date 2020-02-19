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

/*
getText
split in words
find words that matches &
forEach match, get formatted string
iterate over object, calling replace on body
*/
