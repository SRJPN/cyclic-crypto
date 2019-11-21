const mode = (n, m) => {
  if (n < 0)
    n = m - Math.abs(n) % m;

  return n % m;
};

exports.modeEleven = n => mode(n, 11);

exports.modInverse = (a, m) => {
  a = a % m;
  for (x = 1; x < m; x++) {
    if ((a * x) % m == 1)
      return x;
  }
  return 1;
};