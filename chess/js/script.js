const board = document.getElementById("board");

const pieces = {
     r: "♜", n: "♞", b: "♝", q: "♛", k: "♚", p: "♟",
  R: "♖", N: "♘", B: "♗", Q: "♕", K: "♔", P: "♙"
};

let game = [
    "rnbqkbnr",
    "pppppppp",
    "........",
    "........",
    "........",
    "........",
    "PPPPPPPP",
    "RNBQKBNR"
];

let selected = null;
let turn = "white";

function drawBoard(){
    board.innerHTML = "";
    game.forEach((row, r) => {
        [...row].forEach((cell, c) => {
            const square = document.createElement("div");
            square.className = `square ${(r + c) % 2 === 0 ? "light" : "dark"}`;
            square.dataset.row = r;
            square.dataset.col = c;

            if(cell !== ".")square.textContent = pieces[cell];

            square.addEventListener("click", () => onSquareClick(r, c));
            board.appendChild(square);
        })
    })
}

function onSquareClick(r, c){
    const piece = game[r][c];

    if (selected){
        movePiece(selected.row, selected.col, r, c);
        selected = null;
        drawBoard();
        return;
    }

    if(piece !== "." && isCorrectTrun(piece)){
        selected = {row: r, col: c};
        highlightSquare(r, c);
    }
}

function isCorrectTrun(piece){
    return(turn === "white" && piece === piece.toUpperCase())||
    (turn === "black" && piece === piece.toLowerCase());
}

function movePiece(sr, sc, tr, tc){
    const piece = game[sr][sc];
    let row = game[sr].split("");
    row[sc] = ".";
    game[sr] = row.join("");

    row = game[tr].split("");
    row[tc] = piece;
    game[tr] = row.join("");

    turn = turn === "white" ? "black" : "white";
}

function highlightSquare(r, c){
    drawBoard();
    const index = r*8+c;
    board.children[index].classList.add("selected");
}
drawBoard();