var SumOf2 = function (sequence, element) {
  var i,j, idx;
  idx = sequence.indexOf(element);
  for(i = 0; i < idx; i++){
    for(j = (i + 1); j < idx; j++){
      if(sequence[i] + sequence[j] === element){
        return true;
      }
    }
  }
  return false;
};

var SumOfOnly2 = function (sequence, element) {
  var i,j,count = 0, idx, pairs = [];
  idx = sequence.indexOf(element);
  for(i = 0; i < idx; i++){
    for(j = (i + 1); j < idx; j++){
      if(sequence[i] + sequence[j] === element){
        count += 1;
        pairs.push([ sequence[i], sequence[j] ]);
      }
    }
  }
  return { "cond": (count === 1), "pairs": pairs };
};

var Show = function (checked, sequence) {
  var i, j, out;

  out = " [ ";
  for(i = 0; i < sequence.length; i ++){
    out += sequence[i];
    out += ((i+1) < sequence.length ? ", " : "");
  }
  out += " ] ";
  console.log(out);

  for(i = 0; i < checked.length; i++){
    out = checked[i].element + "\t";
    out += (checked[i].cond ? "OK" : "--") + "  ";
    // out += " [ ";
    for(j = 0; j < checked[i].pairs.length; j++){
      out += " [ " + checked[i].pairs[j] + " ] ";
    }
    // out += " ] ";
    console.log(out);
  }
}

var Main = function (n) {
  var i;
  var Sequence = [];
  var Checked = [];
  var Pairs = [];

  for(i = 0; i < n; i++){
    Sequence[i] = i + 1;
  }

  for(i = 2; i < n; i++){
      if( !SumOf2(Sequence, (i + 1)) ){
        Checked.push({ "element": (i + 1), "pairs": [], "cond": false });
        Sequence.splice( Sequence.indexOf(i + 1), 1 );
      }
      else if( !(Pairs = SumOfOnly2(Sequence, (i+1))).cond ){
        Checked.push({ "element": (i + 1), "pairs": Pairs.pairs, "cond": false });
        Sequence.splice( Sequence.indexOf(i + 1), 1 );
      }
      else {
        Checked.push({ "element": (i + 1), "pairs": Pairs.pairs, "cond": true });
      }
  }

  // console.log(Sequence);
  Show(Checked, Sequence);

};

//main
if(process.argv[2]){
  var n = parseInt(process.argv[2]);
  Main(n);
}
else {
  console.log("Wywołanie: node main.js n");
}
