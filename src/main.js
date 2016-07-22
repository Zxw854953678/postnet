'use strict';

function loadAllBars() {
  return [
    '||:::',
    ':::||',
    '::|:|',
    '::||:',
    ':|::|',
    ':|:|:',
    ':||::',
    '|:::|',
    '|::|:',
    '|:|::'
  ];
}
function buildChecksum(postcode) {
  const barStr = postcode.replace('-', '');
  const barsDigit = barStr.split('').map(barsStr=>Number(barsStr));
  const sum = barsDigit.reduce((prv, next)=> {
    return prv + next;
  }, 0);
  const cd = getCd(sum);

  return {barsDigit, cd};
}

function getCd(sum) {
  const result = 10 - sum % 10;
  return result === 10 ? 0 : result;
}

function buildBarsStr(barcodeInfo, allBarsNum) {
  let barsStr = barcodeInfo.barsDigit.map(barcodeNum=> {
    return allBarsNum[barcodeNum];
  });

  barsStr.push(allBarsNum[barcodeInfo.cd]);

  return barsStr;
}

function buildBarcode(barsStr) {
  let bar = barsStr.reduce((prv, next)=> {
    return prv + next
  });
  return `|${bar}|`;
}

function printBar(postcode, allBarsNum) {
  if (!judgeLegal(postcode)) {
    return 'postcode illegal';
  }
  const barcodeInfo = buildChecksum(postcode);
  const barsStr = buildBarsStr(barcodeInfo, allBarsNum);
  const bar = buildBarcode(barsStr);
  console.log(bar);
}

function judgeLegal(postcode) {
  return (postcode.length === 5 || postcode.length === 9 || (postcode.length === 10 && (postcode.indexOf('-') >= 0)));
}

function splitBarcode(bar, allBarsNum) {
  const barcode = bar.substring(1, bar.length - 1);
  let barcodeInfo = [];

  barcode.split('').forEach((bar, index)=> {
    if (isMultiple(index)) {
      const barStr = barcode.substr(index, 5);
      const barDigit = allBarsNum.findIndex(allBarNum=>allBarNum === barStr);
      barcodeInfo.push(barDigit.toString());
    }
  });

  return barcodeInfo;
}

function isBarValid(barDigits) {
  const sum = barDigits.reduce((prv, next)=> {
    return parseInt(prv) + parseInt(next)
  }, 0);

  return (sum % 10 === 0);
}

function isMultiple(barcodeNum) {
  return barcodeNum % 5 === 0;
}

function joinBarDigits(barDigits) {
  return barDigits.reduce((prv, next)=> {
    return prv + next;
  });
}

function printPostcode(bar, allBarsNum) {
  if (!checkBar(bar)) {
    return 'barcode illegal';
  }

  const barDigits = splitBarcode(bar, allBarsNum);

  if (!isBarValid(barDigits)) {
    return 'verification fails';
  }

  let postcode = joinBarDigits(barDigits);
  if (postcode.length === 6)
    console.log(substringPostcode(postcode));
  else {
    console.log(substringPostcode(insertSymbol(postcode)));
  }

}


function insertSymbol(postcode) {
  const splitPostcode = postcode.split('');
  splitPostcode.splice(splitPostcode.length - 5, 0, '-');
  return splitPostcode.join('');
}

function substringPostcode(bar) {
  return bar.substring(0, bar.length - 1);
}

function checkBar(bar) {
  return (bar.length % 6 === 2 || bar.length % 10 === 2);
}

module.exports = {
  buildChecksum: buildChecksum,
  buildBarsStr: buildBarsStr,
  buildBarcode: buildBarcode,
  printBar: printBar,

  splitBarcode: splitBarcode,
  isBarValid: isBarValid,
  joinBarDigits: joinBarDigits,
  printPostcode: printPostcode,

  loadAllBars: loadAllBars
};