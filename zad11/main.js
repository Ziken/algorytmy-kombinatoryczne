var AddFieldToSet = function ( field, set ){
  var i;
  for(i = 0; i < set.length; i++){
    if( (field.x === set[i].x) && (field.y === set[i].y ) ){
      return;
    }
  }
  set.push(field);
};

var CompareFieldSets = function ( set1, set2 ) {
  var i, j, n, cond;
  if(set1.length !== set2.length){
    return false;
  }
  else {
    n = set1.length;
    for(i = 0; i < n; i++){
      cond = false;
      for(j = 0; j < n; j++){
        if(set1[i].x === set2[j].x && set1[i].y === set2[j].y){
          cond = true;
          break;
        }
      }
      if(!cond){
        return false;
      }
    }
    return true;
  }
};

var PrintBoard = function(board) {
  var i,j, n = board.length, m = board[0].length;
  var out;

  // console.log("n: " + n + "; m: " + m);
  // console.log(board);
  for(i = 0; i < n; i++){
    out = "";
    for(j = 0; j < m; j++){
      if( board[i][j].Island === (-1) ){
        out += " ";
      }
      else if( board[i][j].Size > 0 ) {
        out += board[i][j].Size;
      }
      else {
        out += "#";
      }
      out += (j < (m-1) ?
        ( (board[i][j].Size && board[i][j].Size > 9) ? "" : " ") : "|");
    }
    console.log(out);
  }
  out = "";
  for(i = 0; i < m; i++){
    out += "--"
  }
  console.log(out);
  console.log("");
};

var FindPossibleFields = function (board, island) {
  var i,j,k, n = board.length, m = board[0].length;
  var x,y, min_x, max_x, min_y, max_y;
  var PossibleFields = [], Moves = [];
  var up, down, left, right, field;
  for(k = 0; k < island.fields.length; k++)
  {
    x = island.fields[k].x;
    y = island.fields[k].y;

    min_x = ( (x-1) > 0 ? (x-1) : 0 );
    max_x = ( (x+1) < n ? (x+1) : x );
    min_y = ( (y-1) > 0 ? (y-1) : 0 );
    max_y = ( (y+1) < m ? (y+1) : y );

    up    = { "x": x,     "y": min_y };
    down  = { "x": x,     "y": max_y };
    left  = { "x": min_x, "y": y     };
    right = { "x": max_x, "y": y     };

    PossibleFields = [ up, down, left, right ];

    for(i = 0; i < PossibleFields.length; i++){
      field = PossibleFields[i];
      if(board[field.x][field.y].Island === (-1)){
        Moves.push(field);
      }
    }
  }
  return Moves.slice();
};

var CheckPossibleFields = function (board, island, possibleFields){
  var i,j,k, n = board.length, m = board[0].length;
  var x,y, min_x, max_x, min_y, max_y;
  var Moves = [], Fields = [];
  var field, cond;

  for(k = 0; k < possibleFields.length; k++){
      cond = true;
      x = possibleFields[k].x;
      y = possibleFields[k].y;

      min_x = ( (x-1) > 0 ? (x-1) : 0 );
      max_x = ( (x+1) < n ? (x+1) : x );
      min_y = ( (y-1) > 0 ? (y-1) : 0 );
      max_y = ( (y+1) < m ? (y+1) : y );

      up    = { "x": x,     "y": min_y };
      down  = { "x": x,     "y": max_y };
      left  = { "x": min_x, "y": y     };
      right = { "x": max_x, "y": y     };

      Fields = [ up, down, left, right ];

      for(i = 0; i < Fields.length; i++){
        field = Fields[i];
        if(board[field.x][field.y].Island !== (-1) &&
          board[field.x][field.y].Island !== island.id){
          cond = false;
        }
      }

      if(cond){
        Moves.push(possibleFields[k]);
      }
    }
    return Moves.slice();
};

var NextIsland = function(islands, idx) {
  var i, field;
  for(i = 0; i < islands.length; i++){
    field = islands[ (idx + i) % islands.length ];
    if(field.size > field.fields.length){
      return (idx + i) % islands.length;
    }
  }
  return undefined;
};

var CheckIslands = function(board) {
  var i, j, k, n = board.length,m = board[0].length;
  var x, y, min_x, max_x, min_y, min_y;
  var left, right, up, down, field;
  var Fields = [];

  for(i = 0; i < n; i++){
    for(j = 0; j < m; j++){
      if( board[i][j].Island !== (-1) ){
        x = i; y = j;
        min_x = ( (x-1) > 0 ? (x-1) : 0 );
        max_x = ( (x+1) < n ? (x+1) : x );
        min_y = ( (y-1) > 0 ? (y-1) : 0 );
        max_y = ( (y+1) < m ? (y+1) : y );

        left  = board[min_x][y    ];
        right = board[max_x][y    ];
        up    = board[x    ][min_y];
        down  = board[x    ][max_y];

        Fields = [ left, right, up, down ];

        for(k = 0; k < Fields.length; k++){
          field = Fields[k];
          if(field.Island !== (-1) && field.Island !== board[i][j].Island){
            // console.log("ISLANDS BAD");
            return false;
          }
        }
      }
    }
  }
  // console.log("ISLANDS OK");
  return true;
};

var CheckEndSea = function(board) {
  var i, j, n = board.length, m = board[0].length;
  var x, y, max_x, max_y;
  var right, down, rightDown;

  for(i = 0; i < n; i++){
    for(j = 0; j < m; j++){
      if( board[i][j].Island === (-1) ) {
        x = i; y = j;
        max_x = ( (x+1) < n ? (x+1) : x );
        max_y = ( (y+1) < m ? (y+1) : y );

        if(max_x !== x && max_y != y){
          //check if x/y !== max_x/max_y !!
          right     =
            ((max_x !== x) ? board[max_x][y    ] : undefined);
          down      =
            ((max_y !== y) ? board[x    ][max_y] : undefined);
          rightDown =
            ((max_x !== x && max_y || y) ? board[max_x][max_y] : undefined);

          if( right && right.Island === (-1) &&
              down && down.Island === (-1) &&
              rightDown && rightDown.Island === (-1) )
            {
              // console.log("END SEA - BAD");
              return false;
            }
          }
        }
      }
    }
    // console.log("END SEA - OK");
    return true;
};

var CheckSea = function (board) {
  var i, j, idx = 0, n = board.length, m = board[0].length;
  var x, y, min_x, max_x, min_y, max_y;
  var field;
  var BlackFields = [], Neighbors = [], PossibleFields = [];

  for(i = 0; i < n; i++){
    for(j = 0; j < m; j++){
      if(board[i][j].Island === (-1)){
        AddFieldToSet( { "x": i, "y": j }, BlackFields );
      }
    }
  }

  AddFieldToSet( BlackFields[ BlackFields.length - 1 ] , Neighbors );

  while( Neighbors[idx] ){
    x = Neighbors[idx].x;
    y = Neighbors[idx].y;

    min_x = ( (x-1) > 0 ? (x-1) : 0 );
    max_x = ( (x+1) < n ? (x+1) : x );
    min_y = ( (y-1) > 0 ? (y-1) : 0 );
    max_y = ( (y+1) < m ? (y+1) : y );

    up    = { "x": x,     "y": min_y };
    down  = { "x": x,     "y": max_y };
    left  = { "x": min_x, "y": y     };
    right = { "x": max_x, "y": y     };

    PossibleFields = [ up, down, left, right ];

    for(i = 0; i < PossibleFields.length; i ++){
      field = PossibleFields[i];
      if( board[ field.x ][ field.y ].Island === (-1)){
        AddFieldToSet( field, Neighbors );
      }
    }
    idx += 1;
  }

  if( CompareFieldSets( BlackFields, Neighbors ) ){
    // console.log("SEA - OK");
    return true;
  }
  else {
    // console.log("SEA - BAD");
    return false;
  }

};

var MakeMove = function(board, islands, moves, move) {
  islands[move.id].fields.push(move.field);
  board[move.field.x][move.field.y].Island = move.id;
  moves.push(move);
  // console.log("Make Move");
  // console.log(move);
  // PrintBoard(board);
};

var UndoMove = function(board, islands, moves, move) {
  var field = move.field;
  board[field.x][field.y].Island = -1;
  islands[move.id].fields.pop();
  // console.log("Undo Move");
  // console.log(move);
  // PrintBoard(board);
};

var MoveForward = function(board, islands, moves) {
  // console.log("MOVE FORWARD!");

  var idx, lastMove;
  var PossibleFields = [], Fields = [];
  var Move, Island, field;

  while(true){
    PossibleFields = [];
    Fields = [];
    lastMove = moves[ moves.length -1 ];
    idx = NextIsland( islands, lastMove.id );
    if(idx >= 0){
      Island = islands[idx];
      PossibleFields = FindPossibleFields(board,Island);
      Fields = CheckPossibleFields( board, Island, PossibleFields );
      if(Fields.length > 0){
        field = Fields.pop();
        Move = {
          "id": Island.id,
          "field": field,
          "options": Fields
        };
        MakeMove(board, islands, moves, Move);

        if( CheckSea(board) && CheckIslands(board) ){
          // return MoveForward(board, islands, moves);
        }
        else {
          if( ! MoveBackward(board, islands, moves) ){
            console.log("FOUND NO SOLUTION!");
            PrintBoard(board);
            return;
          }
        }

      }
      else {
        if( ! MoveBackward(board, islands, moves) ){
          console.log("FOUND NO SOLUTION!");
          PrintBoard(board);
          return;
        }
      }
    }
    else {
      if( CheckSea(board) && CheckEndSea(board) && CheckIslands(board) ) {
        console.log("FOUND SOLUTION!");
        PrintBoard(board);
        return;
      }
      else {
        if( ! MoveBackward(board, islands, moves) ){
          console.log("FOUND NO SOLUTION!");
          PrintBoard(board);
          return;
        }
      }
    }
  }
};

var MoveBackward = function(board, islands, moves) {
  // console.log("MOVE BACKWARD!");

  var move, field, Move, Field;
  var move = moves.pop();

  UndoMove(board, islands, moves, move);

  if(move.options.length > 0){
    Field = move.options.pop();
    Move = {
      "id": move.id,
      "field": Field,
      "options": move.options
    };

    MakeMove(board, islands, moves, Move);

    if( CheckSea(board) && CheckIslands(board) ){
      // return MoveForward(board, islands, moves);
      return true;
    }
    else {
      return MoveBackward(board, islands, moves);
    }
  }
  else if(moves.length > islands.length){
    return MoveBackward(board, islands, moves);
  }
  else {
    // console.log("FOUND NO SOLUTION.");
    return false;
  }
};

var Nurikabe = function (n, m, islands) {
  var Board = [], Islands = [], Moves = [];
  var i,j;
  var island, field, move;
  //fill board with black (-1) fields
  for(i = 0; i < m; i++){
    Board[i] = [];
    for(j = 0; j < n; j++){
      Board[i][j] = { "Island": -1 };
    }
  }
  //mark islands
  for(i = 0; i < islands.length; i++){
    field = {
      "x": islands[i].y,  // x <--> y for better visualization
      "y": islands[i].x   // y <--> x for better visualization
    };
    island = {
      "id": i,
      "size": islands[i].size,
      "fields": [ field ]
    };
    move = {
      "id": i,
      "field": field,
      "options": []
    };

    Board[field.x][field.y] = { "Island" : island.id, "Size": island.size };
    Islands.push(island);
    Moves.push(move);

  }

  PrintBoard(Board);

  //solve Nurikabe
  return MoveForward( Board, Islands, Moves );
};

if(process.argv[2]){
  var example = parseInt(process.argv[2]);

  if(example === 1){
    // (1) Very Easy 5x5
    Nurikabe(5, 5,
      [
        {"x": 1, "y": 0, "size": 1},
        {"x": 3, "y": 0, "size": 1},

        {"x": 0, "y": 2, "size": 3},

        {"x": 4, "y": 2, "size": 3},
        {"x": 0, "y": 4, "size": 3}
      ]
    );
  }
  else if(example === 2){
    // (2) Easy 10x10
    Nurikabe(10, 10,
      [
        {"x": 7, "y": 0, "size": 5},
        {"x": 9, "y": 0, "size": 2},

        {"x": 0, "y": 1, "size": 3},

        {"x": 1, "y": 2, "size": 4},
        {"x": 4, "y": 2, "size": 2},

        {"x": 6, "y": 3, "size": 3},

        {"x": 5, "y": 4, "size": 4},
        {"x": 1, "y": 4, "size": 4},

        {"x": 9, "y": 5, "size": 3},

        {"x": 1, "y": 8, "size": 3},
        {"x": 4, "y": 8, "size": 3},

        {"x": 2, "y": 9, "size": 1},
        {"x": 5, "y": 9, "size": 1},
        {"x": 7, "y": 9, "size": 3},
        {"x": 9, "y": 9, "size": 3}
      ]
    );
  }
  else if(example === 3){
    // (3) Easy 10x10
    Nurikabe(10, 10,
      [
        {"x": 0, "y": 0, "size": 6},
        {"x": 2, "y": 0, "size": 2},
        {"x": 4, "y": 0, "size": 3},
        {"x": 9, "y": 0, "size": 3},

        {"x": 9, "y": 2, "size": 4},

        {"x": 4, "y": 4, "size": 2},
        {"x": 9, "y": 4, "size": 2},

        {"x": 0, "y": 5, "size": 3},
        {"x": 5, "y": 5, "size": 5},

        {"x": 0, "y": 7, "size": 3},

        {"x": 0, "y": 9, "size": 4},
        {"x": 5, "y": 9, "size": 5},
        {"x": 7, "y": 9, "size": 4},
        {"x": 9, "y": 9, "size": 1}
      ]
    );
  }
}
else {
  console.log("wywołanie: node main #example");
}
