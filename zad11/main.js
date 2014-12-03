var AddFieldToMoves = function ( field, moves ){
  var i;
  for(i = 0; i < moves.length; i++){
    if( (field.x === moves[i].x) && (field.y === moves[i].y ) ){
      return;
    }
  }
  moves.push(field);
};

var PrintBoard = function(board) {
  var i,j, n = board.length;
  var out;
  for(i = 0; i < n; i++){
    out = "";
    for(j = 0; j < n; j++){
        out += /*"("+ j + "," + i +") " +*/
         (board[j][i].Island === (-1) ? '#' : board[j][i].Island ) +
         " ";
    }
    console.log(out);
  }
  console.log("");
};

var FindPossibleMoves = function (board, island) {
  var i,j,k, n = board.length;
  var x,y, min_x, max_x, min_y, max_y;
  var PossibleMoves = [], Moves = [];
  var up, down, left, right, field;
  for(k = 0; k < island.fields.length; k++)
  {
    x = island.fields[k].x;
    y = island.fields[k].y;

    min_x = ( (x-1) > 0 ? (x-1) : 0 );
    max_x = ( (x+1) < n ? (x+1) : x );
    min_y = ( (y-1) > 0 ? (y-1) : 0 );
    max_y = ( (y+1) < n ? (y+1) : y );

    up    = { "x": x,     "y": min_y };
    down  = { "x": x,     "y": max_y };
    left  = { "x": min_x, "y": y     };
    right = { "x": max_x, "y": y     };

    PossibleMoves = [ up, down, left, right ];

    for(i = 0; i < PossibleMoves.length; i++){
      field = PossibleMoves[i];
      if(board[field.x][field.y].Island === (-1)){
        Moves.push(field);
      }
    }
  }
  return Moves.slice();
};

var CheckPossibleMoves = function (board, island, possibleMoves){
  var i,j,k, n = board.length;
  var x,y, min_x, max_x, min_y, max_y;
  var Moves = [], PossibleMoves = [];
  var field, cond;
  // console.log(island);
  for(k = 0; k < possibleMoves.length; k++)
    {
      cond = true;
      x = possibleMoves[k].x;
      y = possibleMoves[k].y;

      min_x = ( (x-1) > 0 ? (x-1) : 0 );
      max_x = ( (x+1) < n ? (x+1) : x );
      min_y = ( (y-1) > 0 ? (y-1) : 0 );
      max_y = ( (y+1) < n ? (y+1) : y );

      up    = { "x": x,     "y": min_y };
      down  = { "x": x,     "y": max_y };
      left  = { "x": min_x, "y": y     };
      right = { "x": max_x, "y": y     };

      PossibleMoves = [ up, down, left, right ];

      for(i = 0; i < PossibleMoves.length; i++){
        field = PossibleMoves[i];
        if(board[field.x][field.y].Island !== (-1) &&
          board[field.x][field.y].Island !== island.id){
          cond = false;
        }
      }

      // for(i = min_x; i <= max_x; i++){
      //   for(j = min_y; j <= max_y; j++){
      //     field = board[i][j];
      //     if(field.Island !== (-1) && field.Island !== island.id){
      //       cond = false;
      //       break;
      //     }
      //   }
      // }
      if(cond){
        Moves.push(possibleMoves[k]);
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

//POPRAWIĆ SPRAWDZANIE SPÓJNOŚCI MORZA!
var CheckSea = function(board, end) {
  var i, j, k, l, n = board.length;
  var x, y, min_x, max_x, min_y, max_y;
  var left, right, up, down, rightDown;
  var Fields = [];
  var count;
  for(i = 0; i < n; i++){
    for(j = 0; j < n; j++){
      if( board[i][j].Island !== (-1) ){
        x = i; y = j;
        min_x = ( (x-1) > 0 ? (x-1) : 0 );
        max_x = ( (x+1) < n ? (x+1) : x );
        min_y = ( (y-1) > 0 ? (y-1) : 0 );
        max_y = ( (y+1) < n ? (y+1) : y );

        left  = board[min_x][y    ];
        right = board[max_x][y    ];
        up    = board[x    ][min_y];
        down  = board[x    ][max_y];

        Fields = [];
        Fields = [ left, right, up, down ];

        for(k = 0; k < Fields.length; k++){
          field = Fields[k];
          if(field.Island !== (-1) && field.Island !== board[i][j].Island){
            // console.log("SEA -- BAD");
            return false;
          }
        }
      }
      else if( board[i][j].Island !== (-1) && end) {
        // console.log("END");
        x = i; y = j;
        max_x = ( (x+1) < n ? (x+1) : x );
        max_y = ( (y+1) < n ? (y+1) : y );

        if(max_x !== x && max_y != y){
          right     = board[max_x][y    ];
          down      = board[x    ][max_y];
          rightDown = board[max_x][max_y];

          if(right.Island === (-1) && down.Island === (-1) &&
              rightDown.Island === (-1))
          {
            // console.log("SEA -- BAD");
            return false;
          }
        }
      }
      else {
        count = 0;
        x = i; y = j;
        min_x = ( (x-1) > 0 ? (x-1) : 0 );
        max_x = ( (x+1) < n ? (x+1) : x );
        min_y = ( (y-1) > 0 ? (y-1) : 0 );
        max_y = ( (y+1) < n ? (y+1) : y );

        if (x !== min_x){ left  = board[min_x][y    ]; }
          else { left  = undefined; }
        if (x !== max_x){ right = board[max_x][y    ]; }
          else { right = undefined; }
        if (y !== min_y){ up    = board[x    ][min_y]; }
          else { up    = undefined; }
        if (y !== max_y){ down  = board[x    ][max_y]; }
          else { down  = undefined; }

        Fields = [];
        Fields = [ left, right, up, down ];

        for(k = 0; k < Fields.length; k++){
          field = Fields[k];
          if(field && field.Island === (-1)){
            count += 1;
          }
        }

        if(count === 1 && !( !left || !right || !up || !down ) ){
          return false;
        }
        else if(count === 0){
          return false;
        }

      }

    }
  }
  // console.log("SEA -- OK");
  return true;
};

var MoveForward = function(board, islands, moves) {
  console.log("MOVE FORWARD!");
  PrintBoard(board);
  var idx, lastMove;
  var PossibleMoves = [], Moves = [];
  var Move, Island, field;

  lastMove = moves[ moves.length -1 ];
  idx = NextIsland( islands, lastMove.id );

  if(idx >= 0){
    Island = islands[idx];
    PossibleMoves = FindPossibleMoves(board,Island);
    Moves = CheckPossibleMoves( board, Island, PossibleMoves );

    if(Moves.length > 0){
      field = Moves.pop();
      //Moves
      Move = {
        "id": Island.id,
        "field": field,
        "options": Moves
      };
      moves.push(Move);
      //Islands
      islands[idx].fields.push(field);
      board[field.x][field.y].Island = Island.id;
      //Check "Sea"
      if( CheckSea(board) ){
        MoveForward(board, islands, moves);
      }
      else {
        MoveBackward(board, islands, moves);
      }
    }
    else {
      MoveBackward(board, islands, moves);
    }
  } else {
    if( CheckSea(board, true) ) {
      console.log("FOUND SOLUTION!");
      PrintBoard(board);
    }
    else {
      MoveBackward(board, islands, moves);
    }
  }
};

var MoveBackward = function(board, islands, moves) {
  console.log("MOVE BACKWARD!");
  PrintBoard(board);
  var move, field, Move, Field;
  var move = moves.pop();
  //undo move
  field = move.field;
  board[field.x][field.y].Island = -1;
  islands[move.id].fields.pop();
  if(move.options.length > 0){
    //make new move
    Field = move.options.pop();
    Move = {
      "id": move.id,
      "field": Field,
      "options": move.options
    };
    moves.push(Move);
    islands[move.id].fields.push(field);
    board[Field.x][Field.y].Island = move.id;
    if( CheckSea(board) ){
      MoveForward(board, islands, moves);
    }
    else {
      MoveBackward(board, islands, moves);
    }
  }
  else if(moves.length > islands.length){
    MoveBackward(board, islands, moves);
  }
  else {
    console.log("FOUND NO SOLUTION.");
    return undefined;
  }
};

var Nurikabe = function (n, islands) {
  var Board = [];
  var Islands = [];
  var Moves = [], PossibleMoves = [];
  var i,j;
  var island, field, move;

  //fill board with black (-1) fields
  for(i = 0; i < n; i++){
    Board[i] = [];
    for(j = 0; j < n; j++){
      Board[i][j] = { "Island": -1 };
    }
  }

  //mark islands
  for(i = 0; i < islands.length; i++){
    field = {
      "x": islands[i].x,
      "y": islands[i].y
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

    Board[field.x][field.y].Island = island.id;
    Islands.push(island);
    Moves.push(move);

  }

  PrintBoard(Board);

  //solve Nurikabe
  MoveForward( Board, Islands, Moves );
};

//main
// Nurikabe(10,
//   [
//     {"x": 7, "y": 0, "size": 5},
//     {"x": 9, "y": 0, "size": 2},
//     {"x": 0, "y": 1, "size": 3},
//     {"x": 1, "y": 2, "size": 4},
//     {"x": 4, "y": 2, "size": 2},
//     {"x": 6, "y": 3, "size": 3},
//     {"x": 5, "y": 4, "size": 4},
//     {"x": 1, "y": 4, "size": 4},
//     {"x": 9, "y": 5, "size": 3},
//     {"x": 1, "y": 8, "size": 3},
//     {"x": 4, "y": 8, "size": 3},
//     {"x": 2, "y": 9, "size": 1},
//     {"x": 5, "y": 9, "size": 1},
//     {"x": 7, "y": 9, "size": 3},
//     {"x": 9, "y": 9, "size": 3}
//   ]
// );

Nurikabe(5,
  [
    {"x": 1, "y": 0, "size": 1},
    {"x": 3, "y": 0, "size": 1},
    {"x": 0, "y": 2, "size": 3},
    {"x": 4, "y": 2, "size": 3},
    {"x": 0, "y": 4, "size": 3}
  ]
);
