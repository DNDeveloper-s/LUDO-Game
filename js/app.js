const pawn = document.getElementById('pawn');
let num = 1;

pawn.addEventListener('click', () => {
    const place = document.querySelector(`.box[data-id="${num}"]`);

    place.innerHTML = '';
    place.innerHTML = `<div id="paw"></div>`;

    num += 1;
});