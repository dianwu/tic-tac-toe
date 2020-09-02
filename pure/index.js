const { fromEvent, Subject } = rxjs;
const { tap, map } = rxjs.operators;
const player1 = new Subject();
const player2 = new Subject();
const players = [player1, player2];
let currnetPlayer = 0;
let step = 0;

const player1Symbol = `<svg viewBox="0 0 100 100" width="100" height="100">
<circle cx="50" cy="50" r="40" stroke="black" stroke-width="3"  class="path" stroke-linecap="round" fill="transparent" />
</svg>`;

const player2Symbol = `<svg viewBox="0 0 100 100" width="100" height="100">
<line x1="10" y1="10" x2="90" y2="90" stroke="black" stroke-width="3"  class="cross-path-1" stroke-linecap="round" />
  <line x1="90" y1="10" x2="10" y2="90" stroke="black" stroke-width="3"  class="cross-path-2" stroke-linecap="round" />
</svg>`;

fromEvent(document.querySelector('.game-board'), 'click')
  .pipe(
    map((e) => ({ player: step % 2, event: e })),
    tap(() => step++)
  )
  .subscribe((action) => players[action.player].next(action.event));

player1.subscribe((e) => {
  console.log('player1', e.target.getAttribute('data-flag'));
  e.target.innerHTML = player1Symbol;
});
player2.subscribe((e) => {
  console.log('player2', e.target.getAttribute('data-flag'));
  e.target.innerHTML = player2Symbol;
});