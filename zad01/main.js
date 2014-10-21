var helpers = require("./helpers.js");

var moveLeft = function (pi, dir, x) {
  helpers.swap(pi, x-1, x);
  helpers.swap(dir, x-1, x);
}

var moveRight = function (pi, dir, x) {
  helpers.swap(pi, x, x+1);
  helpers.swap(dir, x, x+1);
}

//check from n to 1 if element can make a move
//then if there are any higest elements, change their direction
var findMobile = function (pi, dir) {
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
  helpers.printPi(PI,DIR,1);
  var count = helpers.factorial(n);
  // generate n!-1 permutations of Pi
  for(var j = 1; j < count; j++){
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
    helpers.printPi(PI,DIR,j+1);
  }
}

if(process.argv[2]){
  SJT(process.argv[2]);
}
else {
  console.log("Wywołanie: node main.js N");
}
