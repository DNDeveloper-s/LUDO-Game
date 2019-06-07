
function Player(name, color) {
    this.name = name;
    this.color = color;
    this.curPos = null;
    // this.parent = null;
    this.curPawnNo = null;
    this.curPawnEl = null;
    this.place = null;
    this.pawnPlace = [null, null, null, null];
    this.openPawns = [false, false, false, false];
    this.commonPlace = [null, null, null, null];
    this.diceNos = [];
    this.gotDices = [];
    this.readyToMove = false;
    this.selDice = [null, null];
    this.overlappedPawn = [null, null, null, null];
    this.overlapped = false;
    this.oneOpen = false;
    this.availTurn = [];
}
// let players = ["player1", "player2", "player3", "player4"];

let showInfo = document.querySelector('.showInfo');

let player1 = new Player("Saurabh Singh", "r");
let player2 = new Player("Suraj Singh", "g");
let player3 = new Player("Ramesh Singh", "b");
let player4 = new Player("Rekha Singh", "y");

let curPlayer = player1;

let pawn = document.querySelectorAll('.pawn');
let ludoTracks = document.querySelector('.ludo__tracks');
let ludoPlayersPawn = document.querySelector('.ludo__players');
const change = document.querySelector('.temp-5');
const revolve = document.querySelector('.temp-6');
const voice = document.querySelector('.temp-7');
// ludoContainer.addEventListener('click', e => {
//     if(e.srcElement.classList[0] == 'pawn') {
//
//     }
//
// });

// change.addEventListener('click', () => {
//     changePlayer();
// });


ludoTracks.addEventListener('click', e => {
    let cur = e.target;
    if(e.srcElement.classList[0] == 'pawn') {

        if(curPlayer.color === cur.classList[2]) {
            let pawnColor = cur.dataset.pawn.slice(0, -1);

            // curPlayer.parent = cur.parentElement;

            curPlayer.curPawnNo = e.srcElement.classList[1].slice(7);
            curPlayer.curPawnEl = cur;
            curPlayer.pawnPlace[curPlayer.curPawnNo - 1] = eval(cur.parentElement.dataset[pawnColor]);

            if(curPlayer.readyToMove) {
                movePawn(cur);
            }

            // console.log('its matching');
        }

    }
});

function changePlayer() {
    let score;
    let activePlayer;


    let player1Show = document.querySelector(`.ludo__players--home .ludo__players--home-r .activePlayer`);
    let player2Show = document.querySelector(`.ludo__players--home .ludo__players--home-g .activePlayer`);
    let player3Show = document.querySelector(`.ludo__players--home .ludo__players--home-b .activePlayer`);
    let player4Show = document.querySelector(`.ludo__players--home .ludo__players--home-y .activePlayer`);
    player1Show.classList.remove('showThis');
    player2Show.classList.remove('showThis');
    player3Show.classList.remove('showThis');
    player4Show.classList.remove('showThis');

    if(curPlayer === player1) {
        // curPlayer.availTurn = [];
        curPlayer = player2;
        // curPlayer.availTurn.push(1);
    } else if(curPlayer === player2) {
        // curPlayer.availTurn = [];
        curPlayer = player3;
        // curPlayer.availTurn.push(1);
    } else if(curPlayer === player3) {
        // curPlayer.availTurn = [];
        curPlayer = player4;
        // curPlayer.availTurn.push(1);
    } else if(curPlayer === player4) {
        // curPlayer.availTurn = [];
        curPlayer = player1;
        // curPlayer.availTurn.push(1);
    }

    activePlayer = document.querySelector(`.ludo__players--home .ludo__players--home-${curPlayer.color} .activePlayer`);
    score = document.querySelector(`.score__container-${curPlayer.color}`)
    score.innerHTML = '';
    activePlayer.classList.add('showThis');

    getInput();

    // console.log(curPlayer.color);
}

function removeRanDices() {
    curPlayer.gotDices.filter((cur, ind) => {
        if(cur === curPlayer.selDice[0]) {
            curPlayer.gotDices.splice(ind, 1);
        }
    });
}

function checkOverlapping(pl1, pl2) {
    let abortPlayer, pawnNo;

    pl1.commonPlace.forEach((cur1, ind1) => {
        pl2.commonPlace.forEach((cur2, ind2) => {
                if(cur1 === cur2 && cur1 !== null) {
                    if(cur1 !== 0 && cur1 !== 8 && cur1 !== 13 && cur1 !== 21 && cur1 !== 26 && cur1 !== 34 && cur1 !== 39 && cur1 !== 47) {
                        if(curPlayer === pl1) {
                            abortPlayer = pl2;
                            pawnNo = ind2;
                        } else if(curPlayer === pl2) {
                            abortPlayer = pl1;
                            pawnNo = ind1;
                        }
                        abortPlayer.overlappedPawn[pawnNo] = true;
                        abortPlayer.pawnPlace[pawnNo] = null;
                        abortPlayer.commonPlace[pawnNo] = null;
                        abortPlayer.openPawns[pawnNo] = false;
                        curPlayer.overlapped = true;
                        // console.log(pawnNo);
                        let htmlPlace = document.querySelector(`.ludo__players--home-${abortPlayer.color} .ludo__players--home__place[data-place="${pawnNo + 1}"]`);
                        let insertHtml = `<div class="pawn pawn-${abortPlayer.color}-${pawnNo} ${abortPlayer.color}" data-pawn="${abortPlayer.color}${pawnNo}">${pawnNo + 1}</div>`;

                        let removePlace = document.querySelector(`.box[data-id="${cur1}"]`);

                        // htmlPlace.insertAdjacentHTML('beforeend', insertHtml);
                        htmlPlace.childNodes[0].style.display = 'flex';

                        removePlace.removeChild(removePlace.childNodes[0]);
                    }
                } else {
                    curPlayer.overlapped = false;
                }
        })
    })
}



ludoPlayersPawn.addEventListener('click', e => {
    // console.log(e.target);
    if(e.srcElement.classList[0] == 'pawn') {

        if(curPlayer.readyToMove) {
            openPawn(e.srcElement.parentElement);
        }
    }
});


function openPawn(e) {
    let score = document.querySelector(`.score__container-${curPlayer.color}`), timer;

    if(curPlayer.color === e.childNodes[0].classList[2]) {
        if(curPlayer.selDice[0] === 1 || curPlayer.selDice[0] === 6) {

            showInfo.innerHTML = `Opening pawn no. ${e.childNodes[0].classList[1].slice(7)}`;
            showInfo.classList.add('cum');

            e.childNodes[0].style.display = 'none';

            let newPlace = document.querySelector(`.box[data-${curPlayer.color}="0"]`);
            let newhtml = `<div class="pawn pawn-${curPlayer.color}-${e.childNodes[0].classList[1].slice(7)} ${curPlayer.color}" data-pawn="${curPlayer.color}${e.childNodes[0].classList[1].slice(7)}">${e.childNodes[0].classList[1].slice(7)}</div>`;

            newPlace.insertAdjacentHTML('beforeend', newhtml);
            curPlayer.pawnPlace[e.childNodes[0].classList[1].slice(7) - 1] = 0;
            curPlayer.commonPlace[e.childNodes[0].classList[1].slice(7) - 1] = eval(newPlace.dataset.id);
            curPlayer.openPawns[e.childNodes[0].classList[1].slice(7) - 1] = true;

            /* Removing dice no from the data structure which is already ran by the pawn */
            removeRanDices();
            checkTurnIsOver();

            score.removeChild(curPlayer.selDice[1]);
            curPlayer.selDice[0] = null;
            curPlayer.selDice[1] = null;

            if(curPlayer.gotDices.length > 0) {
                curPlayer.selDice[0] = curPlayer.gotDices[0];
                curPlayer.selDice[1] = score.childNodes[0];

                score.childNodes[0].classList.add('active');
            }

            // Setting up auto Move
            timer = autoMove();
        }


        getInput();

        // console.log(e.target);
        // let turnIsOver = checkTurnIsOver();
        if(!curPlayer.gotDices.length > 0) {
            setTimeout(() => {
                // console.log('its changing from openPawn');
                changePlayer();
            }, 152 * timer);
        }

        setTimeout(() => {
            showInfo.innerHTML = '';
            showInfo.classList.remove('cum');
        }, 152 * timer);
    }
}

function movePawn(cur) {
    // console.log('Move Pawn Function has started');
    console.log(cur);
    let toMove = curPlayer.pawnPlace[curPlayer.curPawnNo - 1] + parseInt(curPlayer.selDice[0]);
    let place = null;
    let pawnColor = cur.dataset.pawn.slice(0, -1);
    let score = document.querySelector(`.score__container-${curPlayer.color}`);

    console.log(toMove);
    if(toMove >= 1 && toMove <= 56) {

        setTimeout(() => {
            cur.parentElement.removeChild(cur);

            showInfo.innerHTML = `Moving pawn no. ${curPlayer.curPawnNo}`;
            showInfo.classList.add('cum');
        }, 150);
        let c = 1;
        for(let i = curPlayer.pawnPlace[curPlayer.curPawnNo - 1] + 1; i <= toMove; i++) {
            (function (i) {
                setTimeout(function () {

                    if(place != null) {
                        place.removeChild(place.childNodes[place.childNodes.length - 1]);
                    }

                    place = document.querySelector(`.box[data-${curPlayer.color}="${i}"]`);
                    let html = `<div class="pawn pawn-${curPlayer.color}-${curPlayer.curPawnNo} ${curPlayer.color}" data-pawn="${curPlayer.color}${curPlayer.curPawnNo}">${curPlayer.curPawnNo}</div>`;

                    place.insertAdjacentHTML('beforeend', html);

                    curPlayer.place = place;
                }, 150*c);
            })(i);
            c++;
        }

        setTimeout(() => {
            curPlayer.pawnPlace[curPlayer.curPawnNo - 1] = eval(curPlayer.place.dataset[pawnColor]);
            curPlayer.commonPlace[curPlayer.curPawnNo - 1] = eval(curPlayer.place.dataset.id);
        }, 150 * c);
        // changePlayer();

        setTimeout(() => {
            if(curPlayer === player1) {
                checkOverlapping(curPlayer, player2);
                checkOverlapping(curPlayer, player3);
                checkOverlapping(curPlayer, player4);
            } else if(curPlayer === player2) {
                checkOverlapping(curPlayer, player1);
                checkOverlapping(curPlayer, player3);
                checkOverlapping(curPlayer, player4);
            } else if(curPlayer === player3) {
                checkOverlapping(curPlayer, player1);
                checkOverlapping(curPlayer, player2);
                checkOverlapping(curPlayer, player4);
            } else if(curPlayer === player4) {
                checkOverlapping(curPlayer, player1);
                checkOverlapping(curPlayer, player2);
                checkOverlapping(curPlayer, player3);
            }
        },150*c);

        /* Removing show Info class */
        setTimeout(() => {
            showInfo.innerHTML = '';
            showInfo.classList.remove('cum');
        }, 251 * c);

        /* Removing dice no from the data structure which is already ran by the pawn */
        removeRanDices();

        setTimeout(() => {
            score.removeChild(curPlayer.selDice[1]);
            curPlayer.selDice[0] = null;
            curPlayer.selDice[1] = null;

            if(curPlayer.gotDices.length > 0) {
                curPlayer.selDice[0] = curPlayer.gotDices[0];
                curPlayer.selDice[1] = score.childNodes[0];

                score.childNodes[0].classList.add('active');
            }

        // Setting up auto Move
            autoMove();

            getInput();

        },150*c);

            setTimeout(() => {
                let turnIsOver = checkTurnIsOver();
                if(turnIsOver) {
                    // console.log('its changing from movePawn');
                    changePlayer();
                }
            }, 151*c);
    }
    return c;
}

function checkTurnIsOver() {
    if(!curPlayer.gotDices.length > 0 && !curPlayer.overlapped) {
        return true;
    } else {
        return false;
    }
}

function revolveDice() {
    let number = Math.floor(Math.random() * 6) + 1;
    displayDice(number);

    return number;
}

function displayDice(num) {

    let dice = document.querySelector('.dice');
    dice.style.transform = `rotateZ(720deg)`;

    setTimeout(() => {
        dice.style.transform = `rotateZ(1440deg)`;
        dice.setAttribute("src", `./images/${num}.jpg`);
    }, 250);

    dice.style.transform = `rotateZ(0deg)`;
}


function getDiceNos() {
    let diceNo = revolveDice();
    return diceNo;
}

revolve.addEventListener('click', () => {

    let dice = getDiceNos();

    pushDices(dice);
    pushToUI();
    // console.log(dice);
});

function pushDices(dice) {
    let score = document.querySelector(`.score__container-${curPlayer.color}`);
    if(curPlayer.diceNos[0] && curPlayer.diceNos[curPlayer.diceNos.length - 1] === 6) {

        getInput();

        curPlayer.diceNos.push(dice);
        curPlayer.gotDices.push(dice);
        if(curPlayer.diceNos[curPlayer.diceNos.length - 1] !== 6) {
            curPlayer.readyToMove = true;

            getInput();
        }
        if(curPlayer.diceNos[2] === 6) {
            curPlayer.readyToMove = false;

            setTimeout(() => {
                curPlayer.diceNos = [];
                curPlayer.gotDices = [];
            },501);

            // console.log('Six comes three times');
            setTimeout(() => {
                changePlayer();
            },502);
            getInput();

            // changePlayer();
        }
    } else {
        curPlayer.diceNos = [];
        curPlayer.gotDices = [];
        score.innerHTML = '';
        curPlayer.diceNos.push(dice);
        curPlayer.gotDices.push(dice);
        if(curPlayer.diceNos[curPlayer.diceNos.length - 1] === 6) {
            curPlayer.readyToMove = false;

            getInput();
        } else {
            curPlayer.readyToMove = true;

            getInput();
        }
        // curPlayer.selDice[0] = score.childNodes[0];
        setTimeout(() => {
            curPlayer.selDice[0] = parseInt(score.childNodes[0].innerText);
            curPlayer.selDice[1] = score.childNodes[0];
            score.childNodes[0].classList.add('active');

            // Setting up auto Move
            autoMove();

            // Setting up Change Player if no pawn is out
            let open = false;
            curPlayer.openPawns.forEach(cur => {
                if(cur) {
                    open = true;
                }
            });
            if(!open && curPlayer.diceNos[curPlayer.diceNos.length - 1] !== 6 && curPlayer.diceNos[curPlayer.diceNos.length - 1] !== 1) {
                changePlayer();
            }
        }, 510);
    }
}

function autoMove() {
    let openCount = 0, index, target;
    curPlayer.openPawns.forEach((cur, ind) => {
        if(cur) {
            openCount++;
            index = ind;
            curPlayer.curPawnNo = ind + 1;
        }
    });
    if(openCount === 1 && curPlayer.gotDices.length > 0 && curPlayer.gotDices[0] !== 6 && curPlayer.gotDices[0] !== 1) {
        let place = document.querySelector(`.box[data-${curPlayer.color}="${curPlayer.pawnPlace[index]}"]`);
        place.childNodes.forEach(cur => {
            if(cur.classList.contains(`pawn-${curPlayer.color}-${index+1}`)) {
                target = cur;
            }
        });
        let thisTimer = movePawn(target);
        return thisTimer;
        curPlayer.oneOpen = true;
    } else {
        curPlayer.oneOpen = false;
    }
}

function pushToUI() {
    let html = `<span>${curPlayer.diceNos[curPlayer.diceNos.length - 1]}</span>`;
    let score = document.querySelector(`.score__container-${curPlayer.color}`);

    setTimeout(() => {
        score.insertAdjacentHTML('beforeend', html);
    }, 500);

    score.addEventListener('click', scoreEvent);
}

function scoreEvent(e) {
    if(e.toElement.nodeName.toLowerCase() === 'span') {
        curPlayer.selDice[1] = e.toElement;
        curPlayer.selDice[0] = parseInt(e.toElement.innerText);
        // console.log(e);

        let siblings = e.target.parentElement.childNodes;
        siblings.forEach(cur => {
            cur.classList.remove('active');
        });

        e.target.classList.add('active');
    }
}

voice.addEventListener('click', getInput);