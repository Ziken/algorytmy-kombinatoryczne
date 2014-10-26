module.exports = (function () {
  //n!
  var factorial = function (n) {
    var res = 1;
    for(var i=2; i<=n; i++){
      res *= i;
    }
    return res;
  };

  //pi[i] <-> pi[j]
  var swap = function (pi, i, j) {
    var tmp = pi[i];
    pi[i] = pi[j];
    pi[j] = tmp;
  };

  //print permutation
  var printPi = function (pi) {
    var out = "(";
    for(var i=1; i<pi.length; i++){
      out += ( ( (i===1) ? "" : " ") + pi[i]);
    }
    out += ")";
    console.log(out);
  };
  return {
    'factorial': factorial,
    'swap': swap,
    'printPi': printPi
  };
})();
