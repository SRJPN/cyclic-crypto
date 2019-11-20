const modInverse = (a, m) => {
  a = a % m;
  for (x = 1; x < m; x++) {
    if ((a * x) % m == 1)
      return x;
  }
  return 1;
}

const split = (s) => {
  const median = Math.ceil(s.length / 2);
  return [s.substr(0, median), s.substr(median, s.length)];
}

const format = (list) => list.map(([x, y]) => `${x}${y}`).join();

const mode = (n, m) => {
  if (n < 0)
    n = m - Math.abs(n) % m;

  return n % m;
};

const modeEleven = n => mode(n, 11);

const isCElevenThreeGroup = (x, y) => {
  return modeEleven(y * y) === modeEleven(9 - (x * x));
};

const xFunction = ([x1, y1], [x2, y2]) => {
  const x1x2 = x1 * x2;
  const y1y2 = y1 * y2;
  const y1x2 = y1 * x2;
  const x1y2 = x1 * y2;

  const X = x1x2 - y1y2
  const Y = y1x2 + x1y2;
  return [
    modeEleven(modeEleven(X) * modInverse(3, 11)),
    modeEleven(modeEleven(Y) * modInverse(3, 11)),
  ];
};

const encrypt = ([x1, y1]) => xFunction([x1, y1], [9, 4]);

const decrypt = ([x1, y1]) => xFunction([x1, y1], [9, 7]);

const TEXT_TO_BE_ENCODED = 'HELLO';

const TEXT_IN_ASCII = [...TEXT_TO_BE_ENCODED]
  .map(char => char.charCodeAt(0))
  .reduce((previous, current) => previous.concat([split(current.toString())]), []);

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
