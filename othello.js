/**
 * Created by pablo on 17/05/2016.
 */
var getNewBoard = function (){
    board = []
    for(i =0; i<8;i++){
        board.push([' ',' ',' ',' ',' ',' ',' ',' ']);
    }
    return board;
}

var getOponentTile= function(tile){
    if(tile=='X'){
        return 'O';
    }
    else if(tile=='O'){
        return 'X';
    }
}

//Realiza el movimiento dado y flipea las fichas correspondientes
var makeMove = function (board,tile,xstart,ystart){
    tilesToFlip = isValidMove(board,tile,xstart,ystart);
    if(tilesToFlip == false){
        return false;
    }
    board[xstart][ystart] = tile;
    for( i =0;i<tilesToFlip.length;i++){
        var x =  tilesToFlip[i][0];
        var y = tilesToFlip[i][1];
        board[x][y] = tile;
    }
    return true;

};
var getBoardCopy = function (){
        dupeBoard = getNewBoard();
        for(x=0;x<8;x++){
            for(y=0;y<8;y++){
                dupeBoard[x][y] = board[x][y];
            }
        }
        return dupeBoard;

    };

var getBoardWithValidMoves =  function (board,tile){
    dupeBoard = getBoardCopy(board);
    for(current in getAllValidMoves(dupeBoard,tile)){
        dupeBoard[current[0]][current[1]] = '.';
    }
    return dupeBoard;

};
var drawBoard = function (board){
        //console.log(board);
        console.log(digits18 = '   1    2    3    4    5    6    7    8')
        for(i = 0;i<8;i++){
            var str = (i+1)+"";
            for(j = 0;j<8;j++){
                if(board[i][j]==' '){
                    str+=" |"+"_"+"| ";
                }
                else{
                    str+=" |"+board[i][j]+"| ";
                }
            }
            console.log(str);
        }
    };
//Retorna falso si la jugada en x,y dados es invalida
//Si es un movimiento valid retorna la lista de espacio que se vuelven del jugador
var isValidMove = function (board,color,xStart,yStart){


        if(board[xStart][yStart]!= ' ' || !(isOnBoard(xStart,yStart))){
            return false;
        }
        board[xStart][yStart] = color; //Seteamo de manera temporla la ficha en el tablero
        other = '';
        if(color=='X'){
            other = 'O';
        }
        else{
            other = 'X';
        }
        var moves =[[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];
        var  fichasVolteadas=[];
        for ( var i=0;i< moves.length;i++){

            var xdirection = moves[i][0];
            var ydirection = moves[i][1];
            var x= xStart;
            var y = yStart;
            x+=xdirection;
            y+=ydirection;
            if(isOnBoard(x,y)&&board[x][y]==other){
                x+=xdirection;
                y+=ydirection;
                if (!isOnBoard(x,y)){
                    continue;
                }
                while(board[x][y]==other){
                    x+=xdirection;
                    y+=ydirection;
                    if (!isOnBoard(x,y)){
                        break;
                    }
                }
                if(!isOnBoard(x,y)){
                    continue;
                }
                if(board[x][y]==color){
                    while(true){
                        x-=xdirection;
                        y-=ydirection;
                        if(x==xStart && y==yStart){
                            break;
                        }
                        fichasVolteadas.push([x,y]);
                    }
                }
            }
        }
        board[xStart][yStart] = ' ';
        if(fichasVolteadas.length==0){
            return false;
        }
        return fichasVolteadas;
    };
//Obtiene todos los tiros validos dado un tablero y una ficha (ya sea X u O)
var getAllValidMoves = function (board,color){
        var validMoves = [];
        for(var x = 0; x<8;x++){
            for(var y=0;y<8;y++){
                if(isValidMove(board,color,x,y)!=false){
                    //console.log("Valid:"+x+","+y);
                    validMoves.push([x,y]);
                }

            }
        }
        //console.log("VALID MOVES :"+validMoves);
        return validMoves;
    };
//Realiza un tiro dummy... tomando la primera posibilidad todos los tiros posibles
var getComputerMove = function (board,computerTile){
        var possibleMoves = getAllValidMoves(board,computerTile);
        return possibleMoves[0];
    };

//Verifica si el tiro se encuentra dentro del board
var isOnBoard = function (x,y) {
        return x >= 0 && x <= 7 && y >= 0 && y <=7
    };
//Resetea el board
var resetBoard = function (){
        for(x=0;x<8;x++){
            for(y=0;y<8;y++){
                board[x][y] = ' ';
            }
        }
        board[3][3] = 'X';
        board[3][4] = 'O';
        board[4][3] = 'O';
        board[4][4] = 'X';
    };

//Obtiene el puntaje de cada jugador
var getScoreOfBoard = function (){
        var xscore = 0;
        var oscore = 0;
        for(x = 0;x<8;x++){
            for(y=0;y<8;y++){
                if(board[x][y]== 'X'){
                    xscore++;
                }
                if(board[x][y]=='O'){
                    oscore++;
                }
            }
        }
        return {'X':xscore,'O':oscore};
    };
//Muestra los puntos
var showPoints = function (playerTile,computerTile,mainBoard){
        scores = getScoreOfBoard(mainBoard);
        console.log('You have '+scores[playerTile]+' points. The computer has '+ scores[computerTile]+' points.' );

    };

var enterPlayerTile=function (){
        return ['X','O'];

    };
var getRandomInt = function  (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

//Obtiene el movimiento del juegador en dos numberos sin espacios filaColumna Ej: 57 --> fila 5 col 7
//El numero es entre 1 y 8. La funcion se encarga de transformarlo a los indices de la matriz
var getPlayerMove = function (board,playerTile){
        digits18 = '1 2 3 4 5 6 7 8'
        while(true){
            console.log("Enter your move or type quit to end the game.");
            var move = prompt("Please enter your move. Hints or quit", "5");
            move.toLowerCase();
            if(move=='quit'){
                return 'quit';
            }
            if (move =='hints'){
                return 'hints';
            }
            if(move.length==2){
                var x = parseInt(move.charAt(0))-1;
                var y = parseInt(move.charAt(1))-1;
                if(isValidMove(board,playerTile,x,y)==false){
                    continue;
                }
                else{break;}


            }
            else{
                console.log("Not a valid move.");
            }

        }
        return [x,y];

    };
//Determina quien inicia el juego
var whoGoesFirst = function (){
    var a = getRandomInt(0,1);
    if(a == 0){
        return 'computer';

    }
    else{
        return 'player';
    }


};

function numberBoardToAsciiBoard(board){
    var result = []
    for(var i =0;i<8;i++){
        result.push([]);
        for(var j = 0;j<8;j++){
            if(board[i][j]==0){
                result[i].push(' ');
            }
            else if(board[i][j]==1){
                result[i].push('X');
            }
            else if(board[i][j]==2){
                result[i].push('O');
            }
        }
    }
    return result;
}
function arrayToMatrix(board){
    var newBoard=[];
    var row = [];
    for( i = 0;i<64;i++){

        if(i%8==0 && i!=0){

            newBoard.push(row);
            row = [];
            row.push(board[i]);
        }
        else if(i==63){
            row.push(board[i]);
            newBoard.push(row);
            row = [];

        }
        else{
            row.push(board[i]);

        }

    }
    return newBoard;

}
//Juego de prueba (Main)
    var playSampleGame= function (){

        console.log("------------------------------  REVERSI ----------------------------");
        var mainBoard = getNewBoard();
        resetBoard(mainBoard);
        tiles = enterPlayerTile();
        playerTile = tiles[0];
        computerTile = tiles[1];
        console.log("Player is: "+playerTile);
        showHints = false;
        turn = whoGoesFirst();
        console.log('The ' + turn + ' will go first.')
        while(true){
            if(turn == 'player'){
                console.log("Player turn...");
                if(showHints){
                    var validMovesBoard = getBoardWithValidMoves(mainBoard,playerTile);
                    drawBoard(validMovesBoard);
                }
                else{
                    drawBoard(mainBoard);
                }
                showPoints(playerTile,computerTile,mainBoard);
                if(getAllValidMoves(mainBoard,playerTile).length==0){
                    break;
                }
                var move = getPlayerMove(mainBoard,playerTile);
                console.log("PLAYER MOVE:" +move[0]+","+move[1]);
                console.log("Move num: "+xyToNumber(move[0],move[1]));
                if(move == 'quit'){
                    break;

                }
                else if (move == 'hints'){
                    showHints = !showHints;
                    continue;

                }
                else{
                    makeMove(mainBoard,playerTile,move[0],move[1]);

                }
                if(getAllValidMoves(mainBoard,computerTile).length==0){
                    turn = 'player';
                    continue;
                }
                else{
                    turn = 'computer';
                }
            }
            else{
                console.log("Computer turn...");
                drawBoard(mainBoard);
                showPoints(playerTile,computerTile,mainBoard);
                if(getAllValidMoves(mainBoard,computerTile).length==0){
                    break;
                }
                var dummy = prompt("Continue to see the computers move.");
                var computerMove = getComputerMove(mainBoard,computerTile);
                //var computerMove = AIMoveAscii(mainBoard,2);
                console.log("COMPUTER MOVE:" +computerMove[0]+","+computerMove[1]);
                console.log("Move num: "+xyToNumber(computerMove[0],computerMove[1]));
                makeMove(mainBoard,computerTile,computerMove[0],computerMove[1]);
                if(getAllValidMoves(mainBoard,playerTile).length==0){
                    turn = 'computer';
                    continue;
                }
                else{
                    turn = 'player';
                }

            }

        }
        //Display final score
        drawBoard(mainBoard);
        scores = getScoreOfBoard();
        console.log('X scored'+scores['X']+'points. '+'O scored'+scores['O']+'points')
        if(scores[playerTile]>scores[computerTile]){
            console.log("YOU WON!");
        }
        else if(scores[playerTile]<scores[computerTile]){
            console.log("YOU LOST");
        }
        else{
            console.log("TIE!");
        }

    };



