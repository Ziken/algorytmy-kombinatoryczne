var helpers = require("./helpers.js");

var B = function (m, i){
  if( (m % 2 === 0) && (m > 2) ) {
    if(i < (m-1)) {
      return i;
    }
    else {
      return (m-2);
    }
  }
  else {
    return (m-1);
  }
}


var PERM = function (n) {
  var count = helpers.factorial(n);
  for(var k = 1; k <= count; k++){

    helpers.printPi(PI);

    for(var m = 1; m  < n; m++){
      if(k % helpers.factorial(m) === 0){
          var M = m+1;
          var I = (k/ helpers.factorial(M-1));
          I = (I - (I%1)) % M;
          if(I > 0){
            console.log(/*"k: [" + k + "]  */"m: [" + M + "] i: [" + I +"] " + B(M,I) + " <-> " + M);
            helpers.swap(PI, B(M,I), M);
          }
      }
      else {
        break;
      }
    }

  }
}


if(process.argv[2]){
  var n = process.argv[2];
  var PI = [];

  for(var i = 0; i <= n; i++){
    PI[i] = i;
  }

  PERM(n);
}
