window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

function getInput() {

    const recognition = new SpeechRecognition();

    recognition.interimResults = true;

    recognition.addEventListener('result', e => {
        // console.log(e.results);

        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')
            .split(' ');



        if(e.results[0].isFinal) {
            if(transcript[0] === "call" && transcript[1] === "number") {
                let lead;
                if(transcript[2] === "1" || transcript[2] === "one") {
                    // console.log('Selecting no. 1 Pawn');
                    lead = 1;
                } else
                if(transcript[2] === "2" || transcript[2] === "to" || transcript[2] === "two") {
                    // console.log('Selecting no. 2 Pawn');
                    lead = 2;
                } else
                if(transcript[2] === "3" || transcript[2] === "three" || transcript[2] === "free") {
                    // console.log('Selecting no. 3 Pawn');
                    lead = 3;
                } else
                if(transcript[2] === "4" || transcript[2] === "for" || transcript[2] === "four" || transcript[2] === "forward") {
                    // console.log('Selecting no. 4 Pawn');
                    lead = 4;
                }

            //    Setting Up whole Mechanism
                if(curPlayer.openPawns[lead - 1]) {
                    curPlayer.curPawnNo = lead;
                    let target;
                    let place = document.querySelector(`.box[data-${curPlayer.color}="${curPlayer.pawnPlace[lead - 1]}"]`);
                    place.childNodes.forEach(cur => {
                        if(cur.classList.contains(`pawn-${curPlayer.color}-${lead}`)) {
                            target = cur;
                        }
                    });
                    // console.log(target);
                    if(curPlayer.readyToMove) {
                        movePawn(target);
                    }

                } else {
                    let place = document.querySelector(`.ludo__players--home-${curPlayer.color} .ludo__players--home__place[data-place="${lead}"`);
                    if(curPlayer.readyToMove) {
                        openPawn(place);
                    }
                    // console.log(place.childNodes[0]);
                }

            } else  if(transcript[0] === "call" && (transcript[1] === "dice" || transcript[1] === "dies" || transcript[1] === "rice" || transcript[1] === "nice" || transcript[1] === "eyes" || transcript[1] === "dise" || transcript[1] === "rise")) {
                let dice = getDiceNos();

                pushDices(dice);
                pushToUI();
                console.log('Here, calling the dice');
                showingInfo('Revolving Dice');
            } else if(transcript[0] === 'select') {
                let score = document.querySelector(`.score__container-${curPlayer.color}`), sel;

                if(transcript[1] === 'first') {
                    sel = 1;
                } else if(transcript[1] === 'second') {
                    sel = 2;
                } else if(transcript[1] === 'third') {
                    sel = 3;
                }

                if(curPlayer.gotDices.length > 1) {
                    curPlayer.selDice[1] = score.childNodes[sel - 1];
                    curPlayer.selDice[0] = parseInt(score.childNodes[sel - 1].innerText);
                    // console.log(e);

                    let siblings = score.childNodes;
                    siblings.forEach(cur => {
                        cur.classList.remove('active');
                    });

                    score.childNodes[sel - 1].classList.add('active');
                }

                getInput();

            } else {
                // console.log('Please try again');
                showingInfo('Please Try Again');
                getInput();
            }
        }
    });

    recognition.start();
}

function showingInfo(str) {
    showInfo.innerHTML = str;
    showInfo.classList.add('cum');

    setTimeout(() => {
        showInfo.innerHTML = '';
        showInfo.classList.remove('cum');
    }, 1500);
}

