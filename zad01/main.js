var factorial = function (n) {
  var res = 1;
  for(var i=2; i<=n; i++){
    res *= i;
  }
  return res;
}

var printCount = 0;
var printPi = function (pi, dir) {
  var out = "[";

  for(var i=0; i<pi.length; i++){
    out += (" " +
    ( dir[i]==="<" ? "<" : "" ) +
    pi[i]+
    ( dir[i]===">" ? ">" : "" ));
  }

  out += " ] (";

  for(var i=0; i<pi.length; i++){
    out += (" " + pi[i]);
  }

  out += " )";

  console.log(out + " : " + (++printCount));
}

var swap = function (pi, i, j) {
  var tmp = pi[i];
  pi[i] = pi[j];
  pi[j] = tmp;
}

var moveLeft = function (pi, dir, x) {
  swap(pi, x-1, x);
  swap(dir, x-1, x);
}

var moveRight = function (pi, dir, x) {
  swap(pi, x, x+1);
  swap(dir, x, x+1);
}

var findMobile = function (pi, dir) {
  //check from n to 1 if element can make a move
  //then if there are any higest elements, change their direction
  for(var i=pi.length; i>0; i--){
    var candidate = pi.indexOf(i);
    if( (candidate == 0 && dir[candidate] === ">") ||
        (candidate == (pi.length-1) && dir[candidate] === "<") ||
        (dir[candidate]==="<" && pi[candidate] > pi[candidate-1] ) ||
        (dir[candidate]===">" && pi[candidate] > pi[candidate+1]) )
    {
      if(i != pi.length){
        for(j=i+1; j<=pi.length; j++){
          var k = pi.indexOf(j);
          dir[k] = ( (dir[k] === "<") ? ">" : "<" );
        }
      }
      return candidate;
    }
  }
  return 0;
}

// Steinhaus-Johnson-Trotter
var SJT = function (n) {
  var PI = [];
  var DIR = [];
  var m = n-1;
  for(var i=0; i<n; i++){
    PI[i] = i+1;
    DIR[i] = "<";
  }
  //print firts Pi
  printPi(PI,DIR);
  // generate n!-1 permutations of Pi
  for(var j = 1; j < factorial(n); j++){

    if(j%n===0){
      console.log("----------------");
    }
    //find highest mobile element: 'm'
    //then make move due to 'm' direction
    //and print permutation
    var m = findMobile(PI,DIR);
      // console.log("m: " + m + " " + PI[m] + " " + DIR[m]);
    if(DIR[m] === "<"){
      moveLeft(PI,DIR,m);
    }
    else{
      moveRight(PI,DIR,m);
    }
    printPi(PI,DIR);

  }

}

if(process.argv[2]){
  SJT(process.argv[2]);
}
else {
  console.log("Wywołanie: node main.js N");
}
