const g1 = 'pawn-g-1';
const g2 = 'pawn-g-2';
const g3 = 'pawn-g-3';
const g4 = 'pawn-g-4';

const b1 = 'pawn-b-1';
const b2 = 'pawn-b-2';
const b3 = 'pawn-b-3';
const b4 = 'pawn-b-4';

const r1 = 'pawn-r-1';
const r2 = 'pawn-r-2';
const r3 = 'pawn-r-3';
const r4 = 'pawn-r-4';

const y1 = 'pawn-y-1';
const y2 = 'pawn-y-2';
const y3 = 'pawn-y-3';
const y4 = 'pawn-y-4';

const pawnG1 = document.querySelector(`.${g1}`);
const pawnG2 = document.querySelector(`.${g2}`);
const pawnG3 = document.querySelector(`.${g3}`);
const pawnG4 = document.querySelector(`.${g4}`);

const pawnB1 = document.querySelector(`.${b1}`);
const pawnB2 = document.querySelector(`.${b2}`);
let pawnB3 = document.querySelector(`.${b3}`);
const pawnB4 = document.querySelector(`.${b4}`);

const home = document.querySelector('.ludo__players--home');


const pawnR1 = document.querySelector(`.${r1}`);
const pawnR2 = document.querySelector(`.${r2}`);
const pawnR3 = document.querySelector(`.${r3}`);
const pawnR4 = document.querySelector(`.${r4}`);

const pawnY1 = document.querySelector(`.${y1}`);
const pawnY2 = document.querySelector(`.${y2}`);
const pawnY3 = document.querySelector(`.${y3}`);
const pawnY4 = document.querySelector(`.${y4}`);

const homeG = document.querySelector('.ludo__players--home-g');
const homeB = document.querySelector('.ludo__players--home-b');
const homeR = document.querySelector('.ludo__players--home-r');
const homeY = document.querySelector('.ludo__players--home-y');

const showG = document.querySelector('.ludo__players--home-g .score__container');
const showB = document.querySelector('.ludo__players--home-b .score__container');
const showR = document.querySelector('.ludo__players--home-r .score__container');
const showY = document.querySelector('.ludo__players--home-y .score__container');

/**
 * Testing Purposes
 */

const ap5 = document.querySelector('.temp-5');


/**
 * Main Code Starts here
 */

const box = document.querySelectorAll('.box');
let num, place, activePlayer = 'player1', abortPlayer, con, clickedPawn;

let Data = {
    player1: {
        pawnPlace: [null, null, null, null],
        color: 'green',
        winNum: [5, 6, 13, 100],
        winPos: [false, false, false, false],
        winThis: [false, false, false, false],
        winPawns: [false, false, false, false],
        winMove: [false, false, false, false],
        overlapped: false,
        pawnStyle: [g1, g2, g3, g4],
        pawnStr: ['g1', 'g2', 'g3', 'g4'],
        startingPoint: 14,
        winPlace: 18,
        difference: null,
        diceNos: [null, null, null],
        activeDiff: null,
        farFromWin: [null, null, null, null],
    },
    player2: {
        pawnPlace: [null, null, null, null],
        color: 'blue',
        winNum: [18, 19, 26, 100],
        winPos: [false, false, false, false],
        winThis: [false, false, false, false],
        winPawns: [false, false, false, false],
        winMove: [false, false, false, false],
        overlapped: false,
        pawnStyle: [b1, b2, b3, b4],
        pawnStr: ['b1', 'b2', 'b3', 'b4'],
        startingPoint: 27,
        winPlace: 31,
        difference: null,
        diceNos: [null, null, null],
        activeDiff: null,
        farFromWin: [null, null, null, null],
    },
    player3: {
        pawnPlace: [null, null, null, null],
        color: 'red',
        winNum: [1, 10, 44, 45, 52, 100],
        winPos: [false, false, false, false],
        winThis: [false, false, false, false],
        winPawns: [false, false, false, false],
        winMove: [false, false, false, false],
        overlapped: false,
        pawnStyle: [r1, r2, r3, r4],
        pawnStr: ['r1', 'r2', 'r3', 'r4'],
        startingPoint: 1,
        winPlace: 5,
        difference: null,
        diceNos: [null, null, null],
        activeDiff: null,
        farFromWin: [null, null, null, null],
    },
    player4: {
        pawnPlace: [null, null, null, null],
        color: 'yellow',
        winNum: [31, 32, 39, 100],
        winPos: [false, false, false, false],
        winThis: [false, false, false, false],
        winPawns: [false, false, false, false],
        winMove: [false, false, false, false],
        overlapped: false,
        pawnStyle: [y1, y2, y3, y4],
        pawnStr: ['y1', 'y2', 'y3', 'y4'],
        startingPoint: 40,
        winPlace: 44,
        difference: null,
        diceNos: [null, null, null],
        activeDiff: null,
        farFromWin: [null, null, null, null],
    }
};

function movePawn(startingPoint, pawn) {

    let posi = checkWinEntrance({
        color: Data[activePlayer].color[0],
        num: Data[activePlayer].winNum
    }, pawn);
    loopingAround(startingPoint, posi);

    const winPos = Data[activePlayer].winPos[pawn[pawn.length - 1] - 1];
    const winID = `win${Data[activePlayer].color[0]}`;

    if (winPos) {
        Data[activePlayer].pawnPlace[pawn[pawn.length - 1] - 1] = parseInt(place.dataset[winID]);
    } else {
        Data[activePlayer].pawnPlace[pawn[pawn.length - 1] - 1] = parseInt(place.dataset.id);
    }
    Data[activePlayer].difference = Data[activePlayer].diceNos[0] + Data[activePlayer].diceNos[1] + Data[activePlayer].diceNos[2];
    const html = `<div class="clickable-${Data[activePlayer].color[0]}-${pawn[pawn.length - 1]} pawn ${pawn} ${Data[activePlayer].color[0]}">${pawn[pawn.length - 1]}</div>`;

    place.insertAdjacentHTML('beforeend', html);
    checkDualPawns('player1', 'player2');
    checkDualPawns('player1', 'player3');
    checkDualPawns('player1', 'player4');

    checkDualPawns('player3', 'player2');
    checkDualPawns('player4', 'player2');
    checkDualPawns('player4', 'player3');

    checkRevolvedPawns(pawn);
}

function firstMovePawn(point, pawn) {
    num = 0;
    startThis(point, 'id');

    Data[activePlayer].pawnPlace[pawn[pawn.length - 1] - 1] = parseInt(place.dataset.id);
    const html = `<div class="clickable-${Data[activePlayer].color[0]}-${pawn[pawn.length - 1]} pawn ${pawn} ${Data[activePlayer].color[0]}">${pawn[pawn.length - 1]}</div>`;

    place.insertAdjacentHTML('beforeend', html);
}

function displayDiceNos() {
    let player;
        if(activePlayer === 'player1') {
            player = eval('showG');
        } else if(activePlayer === 'player2') {
            player = eval('showB');
        } else if(activePlayer === 'player3') {
            player = eval('showR');
        } else if(activePlayer === 'player4') {
            player = eval('showY');
        }

        player.innerHTML = '';

        if(Data[activePlayer].diceNos[0] !== null) {
            player.insertAdjacentHTML("beforeend", `${Data[activePlayer].diceNos[0]} `);
        }
        if(Data[activePlayer].diceNos[1] !== null) {
            player.insertAdjacentHTML("beforeend", `${Data[activePlayer].diceNos[1]} `);
        }
        if(Data[activePlayer].diceNos[2] !== null) {
            player.insertAdjacentHTML("beforeend", `${Data[activePlayer].diceNos[2]}`);
        }
}

function pawns(pawn, actPlayer, startingPoint, pawnDOM) {
    home.addEventListener('click', function (e) {
        if (e.target === pawn) {
            if (actPlayer === activePlayer) {
                if(Data[activePlayer].diceNos[0] === 1 || Data[activePlayer].diceNos[0] === 6 || Data[activePlayer].diceNos[1] === 1 || Data[activePlayer].diceNos[1] === 6 || Data[activePlayer].diceNos[2] === 1 || Data[activePlayer].diceNos[2] === 6) {
                    if(Data[activePlayer].diceNos[2] === 1) {
                        Data[activePlayer].diceNos[2] = null;
                    } else if(Data[activePlayer].diceNos[0] === 6 && Data[activePlayer].diceNos[1] === 1 || Data[activePlayer].diceNos[1] === 6) {
                        Data[activePlayer].diceNos[1] = null;
                    } else {
                        Data[activePlayer].diceNos[0] = null;
                    }

                    displayDiceNos();

                    firstMovePawn(startingPoint, pawnDOM);
                    pawn.style.display = 'none';

                    if(Data[activePlayer].diceNos[0] === null && Data[activePlayer].diceNos[1] === null && Data[activePlayer].diceNos[2] === null) {
                        changePlayer();
                    }
                } else {
                    console.log('Your pawn is still locked cause no 1 or 6 on the dice');
                }
            }
        }
    });
}

pawns(pawnG1, 'player1', 14, g1);
pawns(pawnG2, 'player1', 14, g2);
pawns(pawnG3, 'player1', 14, g3);
pawns(pawnG4, 'player1', 14, g4);

pawns(pawnB1, 'player2', 27, b1);
pawns(pawnB2, 'player2', 27, b2);
pawns(pawnB3, 'player2', 27, b3);
pawns(pawnB4, 'player2', 27, b4);

pawns(pawnR1, 'player3', 1, r1);
pawns(pawnR2, 'player3', 1, r2);
pawns(pawnR3, 'player3', 1, r3);
pawns(pawnR4, 'player3', 1, r4);

pawns(pawnY1, 'player4', 40, y1);
pawns(pawnY2, 'player4', 40, y2);
pawns(pawnY3, 'player4', 40, y3);
pawns(pawnY4, 'player4', 40, y4);

function changePlayer() {
    Data[activePlayer].difference = null;
    Data[activePlayer].diceNos[0] = null;
    Data[activePlayer].diceNos[1] = null;
    Data[activePlayer].diceNos[2] = null;

    if(activePlayer === 'player1') {
        activePlayer = 'player2';
        homeB.classList.add('active');
        homeG.classList.remove('active');
    } else if(activePlayer === 'player2') {
        activePlayer = 'player3';
        homeR.classList.add('active');
        homeB.classList.remove('active');
    } else if(activePlayer === 'player3') {
        activePlayer = 'player4';
        homeY.classList.add('active');
        homeR.classList.remove('active');
    } else if(activePlayer === 'player4') {
        activePlayer = 'player1';
        homeG.classList.add('active');
        homeY.classList.remove('active');
    }

    console.log(activePlayer);
}

function clickableElements(event, i, j) {
    let pawn = `${Data[activePlayer].color[i]}${j}`;
    Data[activePlayer].farFromWin[pawn[pawn.length - 1] - 1] = null;

    if(Data[activePlayer].diceNos[0] === null && Data[activePlayer].diceNos[1] === null && Data[activePlayer].diceNos[2] === null) {
        if(!Data[activePlayer].overlapped) {
            changePlayer();
        }
        Data[activePlayer].overlapped = false;
    } else {
        if(Data[activePlayer].diceNos[0] !== null && Data[activePlayer].diceNos[0] <= 6) {
            Data[activePlayer].activeDiff = Data[activePlayer].diceNos[0];
            Data[activePlayer].diceNos[0] = null;
        } else

        if(Data[activePlayer].diceNos[1] !== null && Data[activePlayer].diceNos[1] <= 6) {
            Data[activePlayer].activeDiff = Data[activePlayer].diceNos[1];
            Data[activePlayer].diceNos[1] = null;
        } else

        if(Data[activePlayer].diceNos[2] !== null && Data[activePlayer].diceNos[2] < 6) {
            Data[activePlayer].activeDiff = Data[activePlayer].diceNos[2];
            Data[activePlayer].diceNos[0] = null;
            Data[activePlayer].diceNos[2] = null;
        }

        displayDiceNos();
        event.srcElement.parentElement.removeChild(event.target);
        movePawn(Data[activePlayer].pawnPlace[i], pawn);



        if(Data[activePlayer].diceNos[0] === null && Data[activePlayer].diceNos[1] === null && Data[activePlayer].diceNos[2] === null) {
            if(!Data[activePlayer].overlapped) {
                changePlayer();
            }
        }
    }

}

box.forEach(parentCur => {
    parentCur.addEventListener('click', (e) => {
        const classes = e.srcElement.classList;
        classes.forEach(cur => {
            let pawn;
            if (cur === `clickable-${Data[activePlayer].color[0]}-1`) {
                pawn = `${Data[activePlayer].color[0]}-1`;
                clickedPawn = 'first';
                if(Data[activePlayer].winThis[pawn[pawn.length - 1] - 1]) {
                    if(Data[activePlayer].winMove[pawn[pawn.length - 1] - 1]) {
                        console.log(Data[activePlayer].farFromWin);
                        console.log(Data[activePlayer].difference);
                        if(Data[activePlayer].difference <= Data[activePlayer].farFromWin[pawn[pawn.length - 1] - 1]) {
                            clickableElements(e, 0, 1);
                        } else {
                            if(Data[activePlayer].pawnPlace[1] === null && Data[activePlayer].pawnPlace[2] === null && Data[activePlayer].pawnPlace[3] === null) {
                                changePlayer();
                            }
                        }
                    }
                } else {
                    clickableElements(e, 0, 1);
                }
            } else
            if (cur === `clickable-${Data[activePlayer].color[0]}-2`) {
                pawn = `${Data[activePlayer].color[0]}-2`;
                clickedPawn = 'second';
                if(Data[activePlayer].winThis[pawn[pawn.length - 1] - 1]) {
                    if(Data[activePlayer].winMove[pawn[pawn.length - 1] - 1]) {
                        console.log(Data[activePlayer].farFromWin);
                        console.log(Data[activePlayer].difference);
                        if(Data[activePlayer].difference <= Data[activePlayer].farFromWin[pawn[pawn.length - 1] - 1]) {
                            clickableElements(e, 1, 2);
                        } else {
                            if(Data[activePlayer].pawnPlace[0] === null && Data[activePlayer].pawnPlace[2] === null && Data[activePlayer].pawnPlace[3] === null) {
                                changePlayer();
                            }
                        }
                    }
                } else {
                    clickableElements(e, 1, 2);
                }
            } else
            if (cur === `clickable-${Data[activePlayer].color[0]}-3`) {
                pawn = `${Data[activePlayer].color[0]}-3`;
                clickedPawn = 'third';
                if(Data[activePlayer].winThis[pawn[pawn.length - 1] - 1]) {
                    if(Data[activePlayer].winMove[pawn[pawn.length - 1] - 1]) {
                        console.log(Data[activePlayer].farFromWin);
                        console.log(Data[activePlayer].difference);
                        if(Data[activePlayer].difference <= Data[activePlayer].farFromWin[pawn[pawn.length - 1] - 1]) {
                            clickableElements(e, 2, 3);
                        } else {
                            if(Data[activePlayer].pawnPlace[0] === null && Data[activePlayer].pawnPlace[1] === null && Data[activePlayer].pawnPlace[3] === null) {
                                changePlayer();
                            }
                        }
                    }
                } else {
                    clickableElements(e, 2, 3);
                }
            } else
            if (cur === `clickable-${Data[activePlayer].color[0]}-4`) {
                pawn = `${Data[activePlayer].color[0]}-4`;
                clickedPawn = 'forth';
                if(Data[activePlayer].winThis[pawn[pawn.length - 1] - 1]) {
                    if(Data[activePlayer].winMove[pawn[pawn.length - 1] - 1]) {
                        console.log(Data[activePlayer].farFromWin);
                        console.log(Data[activePlayer].difference);
                        if(Data[activePlayer].difference <= Data[activePlayer].farFromWin[pawn[pawn.length - 1] - 1]) {
                            clickableElements(e, 3, 4);
                        } else {
                            if(Data[activePlayer].pawnPlace[0] === null && Data[activePlayer].pawnPlace[1] === null && Data[activePlayer].pawnPlace[2] === null) {
                                changePlayer();
                            }
                        }
                    }
                } else {
                    clickableElements(e, 3, 4);
                }
            }
        })
    });
});

setInterval(() => {
    let pawn;
    if(clickedPawn === 'first') {
        pawn = `${Data[activePlayer].color[0]}${1}`;
    } else if(clickedPawn === 'second') {
        pawn = `${Data[activePlayer].color[1]}${2}`;
    } else if(clickedPawn === 'third') {
        pawn = `${Data[activePlayer].color[2]}${3}`;
    } else if(clickedPawn === 'forth') {
        pawn = `${Data[activePlayer].color[3]}${4}`;
    }

    if(pawn) {
        if(Data[activePlayer].pawnPlace[0] !== null || Data[activePlayer].pawnPlace[1] !== null || Data[activePlayer].pawnPlace[2] !== null || Data[activePlayer].pawnPlace[3] !== null) {
            if(Data[activePlayer].pawnPlace[pawn[pawn.length - 1] - 1] > 2 && Data[activePlayer].pawnPlace[pawn[pawn.length - 1] - 1] < 7) {
                evalWinDice(pawn);
            }
        }

        if(Data[activePlayer].winThis[pawn[pawn.length - 1] - 1]) {
            Data[activePlayer].winMove[pawn[pawn.length - 1] - 1] = true;
            console.log('Its inside the red pawn');
        }
    }



    if(Data[activePlayer].winPos[0] || Data[activePlayer].winPos[1] || Data[activePlayer].winPos[2] || Data[activePlayer].winPos[3]) {
        checkWinEntrance({
            color: Data[activePlayer].color[0],
            num: Data[activePlayer].winNum
        }, pawn);
        evalWinDice(pawn);
        resetWonPawns(pawn);
    }
});

function evalWinDice(pawn) {
    Data[activePlayer].farFromWin[pawn[pawn.length - 1] - 1] = Data[activePlayer].winPlace - Data[activePlayer].pawnPlace[pawn[pawn.length - 1] - 1];
}

function loopingAround(startingPoint, posy) {
    num = startingPoint;
    num += Data[activePlayer].activeDiff;
    Data[activePlayer].activeDiff = null;
    if (num === 58 || num === 57 || num === 56 || num === 55 || num === 54 || num === 53) {
        if (num === 53) {
            num = 1;
        } else if (num === 54) {
            num = 2;
        } else if (num === 55) {
            num = 3;
        } else if (num === 56) {
            num = 4;
        } else if (num === 57) {
            num = 5;
        } else if (num === 58) {
            num = 6;
        }
    }
    place = document.querySelector(`.box[data-${posy}="${num}"]`);
}

function startThis(point, posy) {
    place = document.querySelector(`.box[data-${posy}="${point}"]`);
}


function checkWinEntrance({
                              color,
                              num
                          }, pawn) {
    const pos = Data[activePlayer].pawnPlace[pawn[pawn.length - 1] - 1];
    const winPosy = Data[activePlayer].winPos[pawn[pawn.length - 1] - 1]
    // [2, 6, 13, 100]
    if (color !== 'r') {
        if (pos >= num[1]) {
            Data[activePlayer].winPos[pawn[pawn.length - 1] - 1] = true;
        }
        if (winPosy) {
            if (pos > num[0] && pos < num[3]) {
                if (pos > (num[2] - 1)) {
                    Data[activePlayer].winThis[pawn[pawn.length - 1] - 1] = true;
                }
                return `win${color}`;
            }
        } else {
            // if (pos > num[0] && pos < num[2]) {
            if (pos > num[0] && pos < num[2]) {
                return `win${color}`;
            } else {
                Data[activePlayer].winPos[pawn[pawn.length - 1] - 1] = false;
                return 'id';
            }
        }
    } else {
        // [1, 4, 46, 51, 52, 100]
        if (pos >= num[3] || pos >= num[0] && pos < num[1]) {
            Data[activePlayer].winPos[pawn[pawn.length - 1] - 1] = true;
        }
        if (winPosy) {
            if (pos >= num[3] || pos >= num[0] && pos < num[1]) {
                if (pos >= num[3] || pos >= num[0] && pos < num[1]) {
                    Data[activePlayer].winThis[pawn[pawn.length - 1] - 1] = true;
                }
                return `win${color}`;
            }
        } else {
            if (pos > num[2] && pos < num[4]) {
                return `win${color}`;
            } else {
                Data[activePlayer].winPos[pawn[pawn.length - 1] - 1] = false;
                return 'id';
            }
        }
    }
}

function checkDualPawns(pl1, pl2) {
    Data[pl1].winPos.forEach((cur1, ind1) => {
        Data[pl2].winPos.forEach((cur2, ind2) => {
            if (!cur1 && !cur2 && Data[pl1].pawnPlace[ind1] !== null && Data[pl2].pawnPlace[ind2] !== null) {

                Data[pl1].pawnPlace.forEach((curL, indL) => {
                    Data[pl2].pawnPlace.forEach((curS, indS) => {
                        if (curL !== null && curS !== null && curL === curS) {
                            activePlayer === `${pl1}` ? abortPlayer = `${pl2}` : abortPlayer = `${pl1}`;
                            if (activePlayer === pl2) {
                                con = Data[abortPlayer].pawnPlace.indexOf(curL);
                            } else if (activePlayer === pl1) {
                                con = Data[abortPlayer].pawnPlace.indexOf(curS);
                            }
                            // Data[abortPlayer].pawn[con].ovlp = true;
                            if (curS === 1 || curS === 9 || curS === 14 || curS === 22 || curS === 27 || curS === 35 || curS === 40 || curS === 48) {

                            } else {
                                if(!Data[abortPlayer].winThis[con]) {
                                    Data[activePlayer].overlapped = true;
                                    resetPawns();
                                }
                            }
                        } else if (curL !== null && curS !== null && curL !== curS) {
                            activePlayer === `${pl1}` ? abortPlayer = `${pl2}` : abortPlayer = `${pl1}`;
                            if (activePlayer === pl2) {
                                con = Data[abortPlayer].pawnPlace.indexOf(curL);
                            } else if (activePlayer === pl1) {
                                con = Data[abortPlayer].pawnPlace.indexOf(curS);
                            }
                        }
                    })
                })
            }
        })
    });
}

function resetPawns() {
    Data[abortPlayer].pawnPlace[con] = null;
    const caughtPawn = `pawn${Data[abortPlayer].color[0].toUpperCase()}${con + 1}`;
    eval(caughtPawn).style.display = 'flex';
    place.children[0].parentElement.removeChild(place.children[0]);
}

function createElement(start, color, end) {
    for (let i = start; i < end; i++) {
        const html = `<div class="boxCol box none" data-win${color}="${i}">${i}</div>`;
        document.querySelector('.wastes').insertAdjacentHTML('beforeend', html);
    }
}

createElement(18, 'g', 24);
createElement(30, 'b', 36);
createElement(43, 'y', 49);
createElement(5, 'r', 11);

function checkRevolvedPawns(pawn) {
    const position = Data[activePlayer].pawnPlace[pawn[pawn.length - 1] - 1];
    const winPosy = Data[activePlayer].winPos[pawn[pawn.length - 1] - 1];

    if (position >= Data[activePlayer].winPlace && winPosy) {
        Data[activePlayer].winPawns[pawn[pawn.length - 1] - 1] = true;

        if (Data[activePlayer].winPawns[0] && Data[activePlayer].winPawns[1] && Data[activePlayer].winPawns[2] && Data[activePlayer].winPawns[3]) {
        }

    }
}

function revolveDice() {
    let number = Math.floor(Math.random() * 6) + 1;
    displayDice(number);

    return number;
}

function displayDice(n) {
    document.querySelector('.ludo__dice').innerHTML = `<img class="dice" src="./images/dice-${n}.png" alt="">`;
}

ap5.addEventListener('click', () => {
    Data[activePlayer].diceNos[0] = null;
    Data[activePlayer].diceNos[1] = null;
    Data[activePlayer].diceNos[2] = null;

    Data[activePlayer].diceNos[0] = revolveDice();

    if(Data[activePlayer].diceNos[0] === 6) {
        Data[activePlayer].diceNos[1] = revolveDice();
    }

    if(Data[activePlayer].diceNos[1] === 6) {
        Data[activePlayer].diceNos[2] = revolveDice();
    }

    displayDiceNos();

    if(Data[activePlayer].diceNos[2] === 6) {
        Data[activePlayer].diceNos[0] = null;
        Data[activePlayer].diceNos[1] = null;
        Data[activePlayer].diceNos[2] = null;

        console.log('Six comes 3 times');
        changePlayer();
    }

    console.log(Data[activePlayer].diceNos);

    if(Data[activePlayer].pawnPlace[0] === null && Data[activePlayer].pawnPlace[1] === null && Data[activePlayer].pawnPlace[2] === null && Data[activePlayer].pawnPlace[3] === null) {
        if(Data[activePlayer].diceNos[0] === 1 || Data[activePlayer].diceNos[0] === 6 || Data[activePlayer].diceNos[1] === 1 || Data[activePlayer].diceNos[1] === 6 || Data[activePlayer].diceNos[2] === 1 || Data[activePlayer].diceNos[2] === 6) {
            console.log('Your pawns are opened, click to open');
        } else {
            changePlayer();
        }
    } else {
        console.log('Run your opened pawn');
    }

    if(Data[activePlayer].overlapped) {
        Data[activePlayer].overlapped = false;
    }

    Data[activePlayer].difference = Data[activePlayer].diceNos[0] + Data[activePlayer].diceNos[1] + Data[activePlayer].diceNos[2];
});

function resetWonPawns(pawn) {
    if(Data[activePlayer].winThis[pawn[pawn.length - 1] - 1]) {
        if(Data[activePlayer].pawnPlace[pawn[pawn.length - 1] - 1] >= (Data[activePlayer].winPlace - 1)) {
            Data[activePlayer].pawnPlace[pawn[pawn.length - 1] - 1] = 'win';
            console.log(`Winner Pawn is resetted`);
        }
    }
}