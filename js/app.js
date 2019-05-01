const pawn = document.querySelector('.pawn-g-1');
const pawnR = document.querySelector('.pawn-r-1');
const box = document.querySelectorAll('.box');
let num, place, difference = 3;


let Data = {
    player1: {
        place: null
    },
    player2: {
        place: null
    }
};

function movePawn(startingPoint) {
    loopingAround(startingPoint);

    place = document.querySelector(`.box[data-id="${num}"]`);

    Data.player1.place = parseInt(place.dataset.id);

    place.innerHTML = '<div class="clickable pawn pawn-g-1 g"></div>';
}

pawn.addEventListener('click', function() {
    movePawn(14);
    pawn.parentElement.removeChild(pawn);
});

box.forEach((cur) => {
    cur.addEventListener('click', (e) => {
        const classes = e.srcElement.classList;

        classes.forEach(cur => {
            if(cur === 'clickable') {
                movePawn(Data.player1.place);
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


function loopingAround(startingPoint) {
    if(num >= 1) {
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
        place.innerHTML = '';
    }else {
        num = startingPoint;
    }
}