const g1 = 'pawn-g-1';
const g2 = 'pawn-g-2';
const g3 = 'pawn-g-3';
const g4 = 'pawn-g-4';


const pawnG1 = document.querySelector(`.${g1}`);
const pawnG2 = document.querySelector(`.${g2}`);
const pawnG3 = document.querySelector(`.${g3}`);
const pawnG4 = document.querySelector(`.${g4}`);
const pawnR = document.querySelector('.pawn-r-1');
const box = document.querySelectorAll('.box');
let num, place, difference = 3, activePlayer;

let Data = {
    player1: {
        pawnPlace: [null, null, null, null],
        color: 'green'
    },
    player2: {
        pawnPlace: [null, null, null, null],
        color: 'blue'
    },
    player3: {
        pawnPlace: [null, null, null, null],
        color: 'red'
    },
    player4: {
        pawnPlace: [null, null, null, null],
        color: 'green'
    }
};

function movePawn(startingPoint, pawn) {
    loopingAround(startingPoint,pawn);

    Data[activePlayer].pawnPlace[pawn[pawn.length - 1] - 1] = parseInt(place.dataset.id);

    place.innerHTML = `<div class="clickable-${pawn[pawn.length - 1]} pawn ${pawn} ${Data[activePlayer].color[0]}">${pawn[pawn.length - 1]}</div>`;
}

function firstMovePawn(point, pawn) {
    num = 0;
    startThis(point);

    Data[activePlayer].pawnPlace[pawn[pawn.length - 1] - 1] = parseInt(place.dataset.id);
    place.innerHTML = `<div class="clickable-${pawn[pawn.length - 1]} pawn ${pawn} ${Data[activePlayer].color[0]}">${pawn[pawn.length - 1]}</div>`;
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

box.forEach(cur => {
    cur.addEventListener('click', (e) => {
        const classes = e.srcElement.classList;
        classes.forEach(cur => {
            if(cur === 'clickable-1') {
                movePawn(Data[activePlayer].pawnPlace[0], g1);
            } else
            if(cur === 'clickable-2') {
                movePawn(Data[activePlayer].pawnPlace[1], g2);
            } else
            if(cur === 'clickable-3') {
                movePawn(Data[activePlayer].pawnPlace[2], g3);
            } else
            if(cur === 'clickable-4') {
                movePawn(Data[activePlayer].pawnPlace[3], g4);
            }
        })
    });
});

pawnR.addEventListener('click', function() {
    if(num >= 1) {
        num += 5;
        place.innerHTML = '';
    } else {
        num = 1;
    }

    place = document.querySelector(`.box[data-id="${num}"]`);

    Data.player1.place = parseInt(place.dataset.id);

    place.innerHTML = '<div class="pawn pawn-r-1 r"></div>';
});


function loopingAround(startingPoint, pawn) {
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
    let clearIt = document.querySelector(`.box[data-id="${Data.player1.pawnPlace[pawn[pawn.length - 1] - 1]}"]`);
    clearIt.innerHTML = '';

    place = document.querySelector(`.box[data-id="${num}"]`);
}

function startThis(point) {
    place = document.querySelector(`.box[data-id="${point}"]`);
}