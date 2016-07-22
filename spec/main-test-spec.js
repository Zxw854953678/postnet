'use strict';

const test = require('../src/main');

describe('buildChecksum funtion',()=>{

  it('print checksum',()=>{
    const postcode = '16749';
    const barcodeInfo = test.buildChecksum(postcode);
    const expectBarcodeInfo = {barsDigit:[1,6,7,4,9],cd:3};

    expect(barcodeInfo).toEqual(expectBarcodeInfo);
  });

  it('print checksum',()=>{
    const postcode = '167490000';
    const barcodeInfo = test.buildChecksum(postcode);
    const expectBarcodeInfo = {barsDigit:[1,6,7,4,9,0,0,0,0],cd:3};

    expect(barcodeInfo).toEqual(expectBarcodeInfo);
  });

  it('print checksum',()=>{
    const postcode = '16749-0000';
    const barcodeInfo = test.buildChecksum(postcode);
    const expectBarcodeInfo = {barsDigit:[1,6,7,4,9,0,0,0,0],cd:3};

    expect(barcodeInfo).toEqual(expectBarcodeInfo);
  });
});

describe('buildBarcodesStr function',()=>{
  const barcodeInfo = {barsDigit:[1,6,7,4,9],cd:3};

  it('print barcodesStr',()=>{
    const allBarsNum =test.loadAllBars();
    const barsStr = test.buildBarsStr(barcodeInfo,allBarsNum);
    const expectBarsStr = [':::||',':||::','|:::|',':|::|','|:|::','::||:'];

    expect(barsStr).toEqual(expectBarsStr);
  });
});

describe('buildBarcode funtion',()=>{
  const barsStr = [':::||',':||::','|:::|',':|::|','|:|::','::||:'];

  it('print barcode',()=>{
    const bar = test.buildBarcode(barsStr);
    const expectBar = '|:::||:||::|:::|:|::||:|::::||:|';

    expect(bar).toEqual(expectBar);
  });
});

describe('printBar funtion',()=>{
  it('print bar',()=>{
    const postcode = '16749';
    const allBarsNum = test.loadAllBars();
    spyOn(console, 'log');
    test.printBar(postcode,allBarsNum);
    const expectBar = '|:::||:||::|:::|:|::||:|::::||:|';

    expect(console.log).toHaveBeenCalledWith(expectBar);
  });

  it('print bar',()=>{
    const postcodeError = '5678900976';
    const err =test.printBar(postcodeError);
    expect(err).toBe('postcode illegal');
  });
});

describe('splitBarcode function',()=>{
  const barcode = '|:::||:||::|:::|:|::||:|::::||:|';

  it('print barcodesNum',()=>{
    const allBarsNum = test.loadAllBars();
    const barcodesNum = test.splitBarcode(barcode,allBarsNum);
    const expectBarcodesNum = ['1','6','7','4','9','3'];

    expect(barcodesNum).toEqual(expectBarcodesNum);
  })
});

describe('isBarValid function',()=>{
  it('print barValid',()=>{
    const barDigits = ['1','6','7','4','9','3'];
    const result = test.isBarValid(barDigits);
    expect(!result).toBeFalsy();
  })
});

describe('joinBarDigits function',()=>{
  const barDigits = ['1','6','7','4','9','3'];

  it('print postcode',()=>{
    const postcode = test.joinBarDigits(barDigits);
    const expectPostcode = '167493';

    expect(postcode).toEqual(expectPostcode);
  })
});

describe('prinPostcode function',()=>{
  it('print postcode',()=>{
    const allBarsNum = test.loadAllBars();
    const bar = '|:::||:||::|:::|:|::||:|::::||:|';
    spyOn(console, 'log');
    test.printPostcode(bar,allBarsNum);
    const expectPostcode = '16749';
    expect(console.log).toHaveBeenCalledWith(expectPostcode);
  });

  it('print postcode',()=>{
    const allBarsNum = test.loadAllBars();
    const bar = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    spyOn(console, 'log');
    test.printPostcode(bar,allBarsNum);
    const expectPostcode = '45056-1234';
    expect(console.log).toHaveBeenCalledWith(expectPostcode);
  });

  it('print postcode',()=>{
    const barErr = '|:::||:||::|:::|:|::||:|::|';
    //spyOn(console, 'log');
    const err = test.printPostcode(barErr);

    const expectErr = 'barcode illegal';
    expect(err).toEqual(expectErr);
  })
});