var printSubsets = function (sets) {
  var i, j, out = "";
  for(i = 0; i < sets.length; i++){
    out += "{";

    for(j = 0; j < sets[i].length; j++){
      out += sets[i][j];
      if(j !== (sets[i].length - 1)){
        out += ", ";
      }
    }

    out += "}";
    if(i !== (sets.length - 1)){
      out += " ";
    }
  }
  console.log(out);
}

var copySubsets = function (subsets) {
  var sets = [], i ,j;
  for(i = 0; i < subsets.length; i++){
    sets[i] = [];
    for(j = 0; j < subsets[i].length; j++){
      sets[i][j] = subsets[i][j];
    }
  }
  return sets;
}

var genSubsets = function (n, k, x, reverse, subsets) {
  var sets = [], s, i, j, p;

  for(i = 0; i < subsets.length; i++){
    s = subsets[i];
    if((i+1) === k){
      s.push(x);
    }
    sets.push(s);
  }

  if((i+1)===k){
    sets.push([x]);
  }

  if(x === n){
    printSubsets(sets);
  }
  else{
    for(j=0; j < (sets.length +1); j++){
      p = ( reverse ? ((sets.length + 1) - j) : (j+1) );
      genSubsets(n, p, x+1, ((j+1)%2===0), copySubsets(sets));
    }
  }
}

if(process.argv[2] && process.argv[2] > 0){
  var n = parseInt(process.argv[2]);
  genSubsets(n, 1, 1, false, []);
}
else {
  console.log("Wywołanie: node main.js N");
  console.log("gdzie N jest liczbą całkowitą większą od 0");
}
