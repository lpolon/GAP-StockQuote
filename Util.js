function getTableValues(ssId, sheetName, firstRow, firstColumn) {
  var sheet = SpreadsheetApp.openById(ssId).getSheetByName(sheetName);
  if (
    sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).getFilter()
  ) {
    sheet
      .getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns())
      .getFilter()
      .remove();
  }
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  var tableValues = sheet
    .getRange(firstRow, firstColumn, lastRow, lastColumn)
    .trimWhitespace()
    .getValues();

  for (var i = tableValues.length - 1; i >= 0; i--) {
    if (
      tableValues[i].every(function(r) {
        return r === '';
      })
    ) {
      tableValues.pop();
    } else {
      break;
    }
  }
  return tableValues;
}

function getIndexArr_(table, listOfHeaders) {
  indexArr = [];
  for (var i = 0; i < table[0].length; i++) {
    for (var j = 0; j < listOfHeaders.length; j++) {
      if (table[0][i] === listOfHeaders[j]) {
        indexArr.push(i);
      }
    }
  }
  return indexArr;
}

function filterTableColumns(table, listOfHeaders) {
  if (typeof table === 'undefined' || typeof listOfHeaders === 'undefined') {
    Logger.log('parametros ausentes');
    return;
  }
  if (listOfHeaders.length === 0) {
    Logger.log('Lista de cabeçalhos para filtrar vazia!');
    return;
  }

  indexArr = getIndexArr_(table, listOfHeaders);
  var newTable = [];
  // para cada linha da tabela original...
  for (var i = 0; i < table.length; i++) {
    var arr = [];
    for (var j = 0; j < listOfHeaders.length; j++) {
      arr.push(table[i][indexArr[j]]);
    }
    newTable.push(arr);
  }
  if (
    newTable[0].some(function(e) {
      return typeof e === 'undefined';
    })
  ) {
    Logger.log('uma ou mais strings da lista não foi encontrada no cabeçalho!');
    return;
  } else {
    //    Logger.log(newTable);
    return newTable;
  }
}

function StringArrayOfArraysToArrayOfObjectsParser(arrayOfArrays) {
  arrayOfArrays.shift();
  return arrayOfArrays.map((e) => {
    return {
      [e[0]]: e[1],
    };
  });
}