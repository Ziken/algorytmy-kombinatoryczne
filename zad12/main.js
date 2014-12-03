var SumArray = function (arr) {
  var i, sum = 0;
  for(i = 0; i < arr.length; i++){
    sum += arr[i].Price;
  }
  return sum;
};

var DiffMaxArray = function (arr, diff) {
  var i, res = [];
  for(i = 0; i < arr.length; i++){
    if( arr[i] <= diff ){
      res.push(arr[i]);
    }
  }
  return res;
};

var ShowResults = function (results) {
  var i, j, k, out;
  //find max price
  var MaxPrice = 1;
  for(i = 0; i < results.length; i++){
    if(results[i].HighPrice > MaxPrice){
      MaxPrice = results[i].HighPrice;
    }
  }
  //filter results by max price
  var MaxResults = [];
  for(i = 0; i < results.length; i++){
    if(results[i].HighPrice === MaxPrice){
      MaxResults.push(results[i]);
    }
  }
  // show filtered results
  results = MaxResults.slice();
  for(i = 0; i < results.length; i++){
    out = "1.." + results[i].HighPrice;
    out += " [ "
    for(j = 0; j < results[i].PM.length; j++){
      out += results[i].PM[j] + " ";
    }
    out += "]";
    console.log(out);
    for(j = 0; j < results[i].Sequences.length; j++){
      out = results[i].Sequences[j].Price +  " = [ ";
      for(k = 0; k < results[i].Sequences[j].Sequence.length; k++){
        out += results[i].Sequences[j].Sequence[k] + " ";
      }
      out += "]";
      console.log(out);
    }
    console.log("");
  }
};

var NextPM = function (pm, m, n) {
  var i, j, cond = true;
  for(i = (n - 1); i >= 0; i--){
    if(i === 0){
      cond = false;
      break;
    }
    if(pm[i] < ((pm[i-1] * m) + 1)){
      pm[i]++;
      for(j = (i + 1); j < n; j++){
        pm[j] = pm[j-1] + 1;
      }
      break;
    }
  }
  if(cond){
    return pm.slice();
  }
  else {
    return undefined;
  }
};

var MoveForward = function(pm, candidates, m, n, price) {
  var sumElements, x;
  for(i = candidates.length; i < m; i++){
    diff = price - SumArray(candidates);
    sumElements = DiffMaxArray(pm, diff);
    if(sumElements.length > 0){
      x = sumElements.pop();
      candidates.push({"Price": x, "Options": sumElements});
    }
    diff = price - SumArray(candidates);
  }
  if(diff !== 0){
    MoveBackward(pm, candidates, m, n, price);
  }
};

var MoveBackward = function(pm, candidates, m, n, price) {
  var cand = candidates.pop();
  if(cand.Options.length > 0){
    cand.Price = cand.Options.pop();
    candidates.push(cand);
    MoveForward(pm, candidates, m, n, price);
  }
  else if(candidates.length > 0){
    MoveBackward(pm, candidates, m, n, price);
  }
  else {
    return undefined;
  }
};

var PostageStamps = function (n, m) {
  var i,j, sumElements, sum = 0, diff, x, max;
  var cond = true, subcond = true;
  var Results = [], Candidates = [ ], Sequences = [], PM = [];
  var HighestPrice = 0;
  var Price = HighestPrice + 1;

  for(i = 0; i < n; i++){
   PM[i] = i + 1;
  }

  while(PM){
    while(cond){
      MoveForward(PM, Candidates, m, n, Price);
      diff = Price - SumArray(Candidates);
      if(diff > 0){
        cond = false;
      }
      else {
        Sequences.push(
          {
            "Price": Price,
            "Sequence": Candidates.map(function (el) { return el.Price; })
          }
        );
        HighestPrice = Price;
        Price += 1;
        Candidates = [];
      }
    }

    Results.push({ "HighPrice": HighestPrice, "PM": PM.slice(),
                   "Sequences": Sequences.slice() });
    Price = 1;
    Candidates = [];
    Sequences = [];
    cond = true;
    //find next PM
    PM = NextPM(PM, m, n);
  }
  ShowResults(Results);
};

if(process.argv[2] && process.argv[3]){
  var n = parseInt(process.argv[2]);
  var m = parseInt(process.argv[3]);
  PostageStamps(n,m);
}
else {
  console.log("Wywołanie: node main.js n m");
}
