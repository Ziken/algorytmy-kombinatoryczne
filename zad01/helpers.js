module.exports = (function () {
  //n!
  var factorial = function (n) {
    var res = 1;
    for(var i=2; i<=n; i++){
      res *= i;
    }
    return res;
  }

  //pi[i] <-> pi[j]
  var swap = function (pi, i, j) {
    var tmp = pi[i];
    pi[i] = pi[j];
    pi[j] = tmp;
  }

  //print permutation with directions,
  //permutation without directions,
  //and permutation's number
  var printPi = function (pi, dir, n) {
    var out = "[";
    for(var i=0; i<pi.length; i++){
      out += ( ( (i==0) ? "" : " ") +
      ( dir[i]==="<" ? "<" : "" ) +
      pi[i]+
      ( dir[i]===">" ? ">" : "" ));
    }
    out += "] ";
    out += "(";
    for(var i=0; i<pi.length; i++){
      out += ( ( (i==0) ? "" : " ") + pi[i]);
    }
    out += ")";
    out += " : " + n;
    console.log(out);
  }
  return {
    'factorial': factorial,
    'swap': swap,
    'printPi': printPi
  }
})();
