const container = document.getElementsByClassName('container');
const btn = document.getElementsByTagName('button')[0];
btn.addEventListener('click', resetGame);

let players = [];
let cont = 0;
let matrix;
let winner = "";

function createMatrix() {
    let size = 3;
    matrix = new Array(size);
    for (let i = 0; i < size; i++) {
        matrix[i] = new Array(size).fill("");
    }
}

function Person(name) {
    this.name = name;
}

function Player(name, marker) {
    this.name = name;
    this.marker = marker;
}

Object.setPrototypeOf(Player.prototype, Person.prototype);

function createPlayer(player, char) {
    let text;
    let person = prompt('Please enter player name: ');

    while (person === null || person.length === 0) {
        alert(`The name can't be empty, please enter your name`);
        person = prompt('Please enter player name');
    }

    text = person;

    document.getElementById(player).innerHTML = text;

    const player1 = new Player(person, char);
    players.push(player1);
}

createPlayer('player' + 1, 'X');
createPlayer('player' + 2, 'O');

playerActive('O');

startGame();
createMatrix();

function startGame() {
    const col = document.getElementsByClassName('col');

    btn.removeEventListener('click', resetGame);

    playerActive('O');

    for (let i = 0; i < col.length; i++) {
        col[i].addEventListener('click', function () {
            selection(col[i], col[i].classList[2]);
        });
    }
}

function endGame() {
    const col = document.getElementsByClassName('col');

    for (let i = 0; i < col.length; i++) {
        col[i].classList.add('win');
    }

    document.getElementsByTagName('button')[0].style.opacity = '1';
    document.getElementsByTagName('button')[0].classList.add('reset');
}

function playerActive(mark) {
    const users = document.getElementsByClassName('player');

    if (players[0].marker === mark) {
        users[0].style.opacity = "0.5";
        users[1].style.opacity = "1";
    } else {
        users[0].style.opacity = "1";
        users[1].style.opacity = "0.5";
    }
}

function selection(element, position) {
    let char = '';

    if (element.classList.contains('clicked') || (element.classList.contains('win'))) {
        return;
    }

    element.classList.add("clicked");

    if (cont % 2 === 0 && element.innerHTML === "") {
        playerActive('X');
        element.innerHTML = 'X';
        char = 'X';
    } else if (cont % 2 !== 0 && element.innerHTML === "") {
        playerActive('O');
        element.innerHTML = 'O';
        char = 'O';
    }

    addMatrixChar(position, char);

    if (cont >= 4) {
        winner = theWinnerIs(char);
        if (winner.length > 0) {
            btn.addEventListener('click', resetGame);
            winnerStyle(winner, "#90ee90");
            const usersStyle = document.getElementsByClassName("player");

            for (let i = 0; i < players.length; i++) {
                usersStyle[i].style.opacity = "0.5";
            }

            if (players[0].marker === char) {
                document.getElementById("winner").innerHTML = "The winner is: " + players[0].name;
            } else {
                document.getElementById("winner").innerHTML = "The winner is: " + players[1].name;
            }

            endGame();
        }
    }

    if (cont === 8) {
        const draw = document.getElementById('draw');
        draw.innerHTML = "draw";

        document.getElementsByTagName('button')[0].classList.add('reset');
        document.getElementsByTagName('button')[0].style.opacity = '1';

        document.getElementsByClassName("player")[0].style.opacity = "0.5";
        document.getElementsByClassName("player")[1].style.opacity = "0.5";
    }

    cont++;
}

function winnerStyle(matrixPos, color) {
    matrixPos = matrixPos.split(" ");
    const classElement = new Array();
    const cols = document.getElementsByClassName('col');

    for (let i = 0; i < matrixPos.length; i++) {
        classElement.push(matrixPos[i]);
    }

    for (let i = 0; i < cols.length; i++) {
        if (cols[i].classList.contains(classElement[0])) {
            document.getElementsByClassName(`${classElement[0]}`)[0].style.backgroundColor = color;

        } else if (cols[i].classList.contains(classElement[1])) {
            document.getElementsByClassName(`${classElement[1]}`)[0].style.backgroundColor = color;

        } else if (cols[i].classList.contains(classElement[2])) {
            document.getElementsByClassName(`${classElement[2]}`)[0].style.backgroundColor = color;
        }
    }
}

function addMatrixChar(position, char) {
    const matrixMarks = position.substring(7).split("");
    matrix[matrixMarks[0]][matrixMarks[1]] = char;
}

function theWinnerIs(char) {
    if ((matrix[0][0] === char) && (matrix[0][1] === char) && (matrix[0][2] === char)) {
        return "matrix-00 matrix-01 matrix-02";
    }

    if ((matrix[0][0] === char) && (matrix[1][0] === char) && (matrix[2][0] === char)) {
        return "matrix-00 matrix-10 matrix-20";
    }

    if ((matrix[0][1] === char) && (matrix[1][1] === char) && (matrix[2][1] === char)) {
        return "matrix-01 matrix-11 matrix-21";
    }

    if ((matrix[0][2] === char) && (matrix[1][2] === char) && (matrix[2][2] === char)) {
        return "matrix-02 matrix-12 matrix-22";
    }

    if ((matrix[1][0] === char) && (matrix[1][1] === char) && (matrix[1][2] === char)) {
        return "matrix-10 matrix-11 matrix-12";
    }

    if ((matrix[2][0] === char) && (matrix[2][1] === char) && (matrix[2][2] === char)) {
        return "matrix-20 matrix-21 matrix-22";
    }

    if ((matrix[0][0] === char) && (matrix[1][1] === char) && (matrix[2][2] === char)) {
        return "matrix-00 matrix-11 matrix-22";
    }

    if ((matrix[2][0] === char) && (matrix[1][1] === char) && (matrix[0][2] === char)) {
        return "matrix-20 matrix-11 matrix-02";
    }

    return "";
}

function resetGame() {
    const col = document.getElementsByClassName('col');
    document.getElementById("winner").innerHTML = "";

    for (let i = 0; i < col.length; i++) {
        col[i].innerHTML = "";
        col[i].classList.remove('clicked', 'win');
        col[i].style.backgroundColor = 'transparent';
    }

    cont = 0;
    winner = "";
    document.getElementsByTagName('button')[0].style.opacity = '0.5';
    document.getElementsByTagName('button')[0].classList.remove('reset');

    const usersStyle = document.getElementsByClassName("player");

    for (let i = 0; i < players.length; i++) {
        usersStyle[i].style.opacity = "1";
    }

    createMatrix();
    startGame();

    document.getElementById('draw').innerHTML = "";
}