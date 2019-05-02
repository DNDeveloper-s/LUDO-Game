const g1 = 'pawn-g-1';
const g2 = 'pawn-g-2';
const g3 = 'pawn-g-3';
const g4 = 'pawn-g-4';

const b1 = 'pawn-b-1';
const b2 = 'pawn-b-2';
const b3 = 'pawn-b-3';
const b4 = 'pawn-b-4';

const pawnG1 = document.querySelector(`.${g1}`);
const pawnG2 = document.querySelector(`.${g2}`);
const pawnG3 = document.querySelector(`.${g3}`);
const pawnG4 = document.querySelector(`.${g4}`);

const pawnB1 = document.querySelector(`.${b1}`);
const pawnB2 = document.querySelector(`.${b2}`);
const pawnB3 = document.querySelector(`.${b3}`);
const pawnB4 = document.querySelector(`.${b4}`);

const ap1 = document.querySelector('.temp-1');
const ap2 = document.querySelector('.temp-2');
const ap3 = document.querySelector('.temp-3');
const ap4 = document.querySelector('.temp-4');


ap1.addEventListener('click', function() {
    activePlayer = 'player1';
});
ap2.addEventListener('click', function() {
    activePlayer = 'player2';
});
ap3.addEventListener('click', function() {
    activePlayer = 'player3';
});
ap4.addEventListener('click', function() {
    activePlayer = 'player4';
});

const pawnR = document.querySelector('.pawn-r-1');
const box = document.querySelectorAll('.box');
let num, place, difference = 3, activePlayer;

let Data = {
    player1: {
        pawnPlace: [null, null, null, null],
        color: 'green',
        winPos: [false, false, false, false]
    },
    player2: {
        pawnPlace: [null, null, null, null],
        color: 'blue',
        winPos: [false, false, false, false]
    },
    player3: {
        pawnPlace: [null, null, null, null],
        color: 'red',
        winPos: [false, false, false, false]
    },
    player4: {
        pawnPlace: [null, null, null, null],
        color: 'green',
        winPos: [false, false, false, false]
    }
};


function movePawn(startingPoint, pawn) {
    let posi = checkWinEntrance(Data[activePlayer].color[0], pawn);
    loopingAround(startingPoint, posi);

    const winPos = Data[activePlayer].winPos[pawn[pawn.length - 1] - 1];
    if(winPos) {
        Data[activePlayer].pawnPlace[pawn[pawn.length - 1] - 1] = parseInt(place.dataset.wing);
    } else {
        Data[activePlayer].pawnPlace[pawn[pawn.length - 1] - 1] = parseInt(place.dataset.id);
    }

    const html = `<div class="clickable-${Data[activePlayer].color[0]}-${pawn[pawn.length - 1]} pawn ${pawn} ${Data[activePlayer].color[0]}">${pawn[pawn.length - 1]}</div>`;

    place.insertAdjacentHTML('beforeend', html);
}

function firstMovePawn(point, pawn) {
    num = 0;
    startThis(point, 'id');

    Data[activePlayer].pawnPlace[pawn[pawn.length - 1] - 1] = parseInt(place.dataset.id);
    const html = `<div class="clickable-${Data[activePlayer].color[0]}-${pawn[pawn.length - 1]} pawn ${pawn} ${Data[activePlayer].color[0]}">${pawn[pawn.length - 1]}</div>`;

    place.insertAdjacentHTML('beforeend', html);
}

pawnG1.addEventListener('click', function() {
    activePlayer = 'player1';
    firstMovePawn(14, g1);
    pawnG1.parentElement.removeChild(pawnG1);
});
pawnG2.addEventListener('click', function() {
    activePlayer = 'player1';
    firstMovePawn(14, g2);
    pawnG2.parentElement.removeChild(pawnG2);
});
pawnG3.addEventListener('click', function() {
    activePlayer = 'player1';
    firstMovePawn(14, g3);
    pawnG3.parentElement.removeChild(pawnG3);
});
pawnG4.addEventListener('click', function() {
    activePlayer = 'player1';
    firstMovePawn(14, g4);
    pawnG4.parentElement.removeChild(pawnG4);
});

pawnB1.addEventListener('click', function() {
    activePlayer = 'player2';
    firstMovePawn(27, b1);
    pawnB1.parentElement.removeChild(pawnB1);
});
pawnB2.addEventListener('click', function() {
    activePlayer = 'player2';
    firstMovePawn(27, b2);
    pawnB2.parentElement.removeChild(pawnB2);
});
pawnB3.addEventListener('click', function() {
    activePlayer = 'player2';
    firstMovePawn(27, b3);
    pawnB3.parentElement.removeChild(pawnB3);
});
pawnB4.addEventListener('click', function() {
    activePlayer = 'player2';
    firstMovePawn(27, b4);
    pawnB4.parentElement.removeChild(pawnB4);
});



box.forEach(parentCur => {
    parentCur.addEventListener('click', (e) => {
        const classes = e.srcElement.classList;
        classes.forEach(cur => {
            if(cur === `clickable-${Data[activePlayer].color[0]}-1`) {
                e.srcElement.parentElement.removeChild(e.target);
                movePawn(Data[activePlayer].pawnPlace[0], `${Data[activePlayer].color[0]}1`);
            } else
            if(cur === `clickable-${Data[activePlayer].color[0]}-2`) {
                e.srcElement.parentElement.removeChild(e.target);
                movePawn(Data[activePlayer].pawnPlace[1], `${Data[activePlayer].color[0]}2`);
            } else
            if(cur === `clickable-${Data[activePlayer].color[0]}-3`) {
                e.srcElement.parentElement.removeChild(e.target);
                movePawn(Data[activePlayer].pawnPlace[2], `${Data[activePlayer].color[0]}3`);
            } else
            if(cur === `clickable-${Data[activePlayer].color[0]}-4`) {
                e.srcElement.parentElement.removeChild(e.target);
                movePawn(Data[activePlayer].pawnPlace[3], `${Data[activePlayer].color[0]}4`);
            }
        })
    });
});

function loopingAround(startingPoint, posy) {
        num = startingPoint;
        num += difference;
        if(num === 58 || num === 57 || num === 56 || num === 55 || num === 54 || num === 53) {
            if(num === 53) {
                num = 1;
            } else if(num === 54) {
                num = 2;
            } else if(num === 55) {
                num = 3;
            } else if(num === 56) {
                num = 4;
            } else if(num === 57) {
                num = 5;
            } else if(num === 58) {
                num = 6;
            }
        }

    place = document.querySelector(`.box[data-${posy}="${num}"]`);
}

function startThis(point, posy) {
    place = document.querySelector(`.box[data-${posy}="${point}"]`);
}


function checkWinEntrance(color, pawn) {
    const pos = Data[activePlayer].pawnPlace[pawn[pawn.length - 1] - 1];
    const winPosy = Data[activePlayer].winPos[pawn[pawn.length - 1] - 1];
    if(color === 'g') {
        if(winPosy) {
            if(pos > 7 && pos < 100) {
                Data[activePlayer].winPos[pawn[pawn.length - 1] - 1] = true;
                return `win${color}`;
            }
        } else {
            if(pos > 7 && pos < 13) {
                Data[activePlayer].winPos[pawn[pawn.length - 1] - 1] = true;
                return `win${color}`;
            } else {
                Data[activePlayer].winPos[pawn[pawn.length - 1] - 1] = false;
                return 'id';
            }
        }
    }
}