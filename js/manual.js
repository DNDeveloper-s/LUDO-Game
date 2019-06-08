let manualBtn = document.querySelector('.temp-8');
let manualPanel = document.querySelector('.manual__panel');
let closeManual = document.querySelector('.close_manual');
let ssBtn = document.querySelector('.openSS');
let ssPanel = document.querySelector('.ss_guides');
let closeSS = document.querySelector('.close_ss');

manualBtn.addEventListener('click', () => {
    manualPanel.classList.add('open');
    document.querySelector('.menu').classList.add('closed');
});

closeManual.addEventListener('click', () => {
    manualPanel.classList.remove('open');
    document.querySelector('.menu').classList.remove('closed');
});

ssBtn.addEventListener('click', () => {
    ssPanel.classList.add('open');
});

closeSS.addEventListener('click', () => {
   ssPanel.classList.remove('open');
});