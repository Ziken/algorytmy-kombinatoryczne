var helpers = require("./helpers.js");

// procedure PERM(m)
// begin
//   if m = 1 then WYPISZ(PI[1], ... ,PI[n])
//   else
//     for i=1 to m do
//       PERM(m-1)
//       if i < m then PI[ B(m,i) ] <-> PI[m]
// end;
var PERM = function (m) {
  if(m === 1) {
    helpers.printPi(PI);
  }
  else {
    for(var i = 1; i <= m; i++){
      PERM(m-1);
      if(i < m) {
        console.log("m: [" + m + "] i: [" + i +"] " + B(m,i) + " <-> " + m);
        helpers.swap(PI, B(m,i), m);
      }
    }
  }
}

// function B(m,i)
// begin
//   if ( (m mod 2 = 0) and (m > 2) ) then
//     if i < (m-1) then B <- i
//     else B <- m-2
//   else B <- m-1
// end;
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



if(process.argv[2]){
  var n = process.argv[2];
  var PI = [];

  // //program główny
  // begin
  //   for i=1 to n do PI[i] = i
  //   PERM(n)
  // end;
  for(var i = 1; i <= n; i++){
    PI[i] = i;
  }
  PERM(n);
}
else {
  console.log("Wywołanie: node recursive.js N");
}
