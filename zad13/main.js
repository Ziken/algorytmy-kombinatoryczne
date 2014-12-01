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
  var i,j,count = 0, idx;
  idx = sequence.indexOf(element);
  for(i = 0; i < idx; i++){
    for(j = (i + 1); j < idx; j++){
      if(sequence[i] + sequence[j] === element){
        count += 1;
      }
    }
  }
  return (count === 1);
};

var Main = function (n) {
  var i;
  var Sequence = [];

  for(i = 0; i < n; i++){
    Sequence[i] = i + 1;
  }

  for(i = 2; i < n; i++){
      if( !SumOf2(Sequence, (i + 1)) || !SumOfOnly2(Sequence, (i+1)) ){
        Sequence.splice( Sequence.indexOf(i + 1), 1 );
      }
  }

  console.log(Sequence);

};

//main
if(process.argv[2]){
  var n = parseInt(process.argv[2]);
  Main(n);
}
else {
  console.log("Wywołanie: node main.js n");
}
