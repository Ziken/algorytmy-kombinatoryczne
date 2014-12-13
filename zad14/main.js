var P = "abc";
var T = "ababababcabababccccababababcabababcccc";

var MatchPattern = function (p, t) {
  var i,j, hits = [];
  var count = 0;
  for(i = 0; i < t.length - p.length + 1; i++){
    for(j = 0; j < p.length; j++){
      count += 1;
      if(p[j] !== t[i+j]){
        i = ((j > 0) ? (i + j - 1) : (i + j));
        break;
      }
    }
    if(j === p.length){
      hits.push(i);
      i = (i + j -1);
    }
  }

  console.log(hits);
  console.log("   n = " + t.length);
  console.log("T(n) = " + count);

};

// MatchPattern(P, T);

if(process.argv[2] && process.argv[3]){
  var p = process.argv[2];
  var t = process.argv[3];
  MatchPattern(p, t);
}
else {
  console.log("Wywołanie: node main.js Pattern Text");
}
