// (x1, y1) + (x2, y2) = 1/r (x1.x2 - y1.y2), (y1.x2 +x1.y2) Mod 11
// 
// y*y % 11 = 9-x*x % 11

// x1 = 7
// y1 = 2
// x2 = 9
// y2 = 4

// // [9,4]

// X1 = (x1 * x2 - y1 * y2) % 11;
// Y1 = (y1 * x2) + (x1 * y2) % 11

const format = (list) => list.map(([x, y]) => `${x}${y}`).join();

const modeEleven = n => {
  const p = 11;
  if (n < 0)
    n = p - Math.abs(n) % p;

  return n % p;
};

const isCElevenThreeGroup = (x, y) => {
  return modeEleven(y * y) === modeEleven(9 - (x * x));
};

const xFunction = ([x1, y1], [x2, y2]) => {
  const x1x2 = x1 * x2;
  const y1y2 = y1 * y2;
  const y1x2 = y1 * x2;
  const x1y2 = x1 * y2;
  if (isCElevenThreeGroup(x1, y1)) {
    const X = x1x2 - y1y2
    const Y = modeEleven(y1x2 + x1y2);
    return [
      (modeEleven(X) / 3),
      (Y / 3)
    ];
  }
  const X = x1x2 - y1y2
  const Y = y1x2 + x1y2;
  return [
    modeEleven(X / 3),
    modeEleven(Y / 3)
  ];
};

const encrypt = ([x1, y1]) => {
  return xFunction([x1, y1], [9, 4]);
};

const decrypt = ([x1, y1]) => {
  return xFunction([x1, y1], [9, 7]);
};

const TEXT_TO_BE_ENCODED = 'HELLO';

const TEXT_IN_ASCII = [...TEXT_TO_BE_ENCODED]
  .map(char => char.charCodeAt(0))
  .reduce((previous, current) => previous.concat([current.toString().split('')]), []);

const ENCRYPTED_TEXT = TEXT_IN_ASCII.map(encrypt);

const DECRYPTED_TEXT = ENCRYPTED_TEXT
  .map(decrypt);

const RETRIEVED_TEXT = DECRYPTED_TEXT
  .map(([x, y]) => parseInt(x.toString() + y))
  .map(x => String.fromCharCode(x))
  .map(x => x.toString())
  .join("");

// Printing....
console.log("Text to be encoded: ", TEXT_TO_BE_ENCODED);
console.log("Text in ASCII: ", format(TEXT_IN_ASCII));
console.log("Text Encoded: ", format(ENCRYPTED_TEXT));
console.log("Text Decoded back: ", format(DECRYPTED_TEXT));
console.log("Text retrieved back: ", RETRIEVED_TEXT);
