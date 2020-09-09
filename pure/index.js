const { fromEvent, Subject } = rxjs;
const { tap, map, filter } = rxjs.operators;
const player1 = new Subject();
const player2 = new Subject();
const players = [player1, player2];
const winFlag = [
  // 橫向連線
  1 << 1 | 1 << 2 | 1 << 3,
  1 << 4 | 1 << 5 | 1 << 6,
  1 << 7 | 1 << 8 | 1 << 9,
  // 直向連線
  1 << 1 | 1 << 4 | 1 << 7,
  1 << 2 | 1 << 5 | 1 << 8,
  1 << 3 | 1 << 6 | 1 << 9,
  // 斜向連線
  1 << 1 | 1 << 5 | 1 << 9,
  1 << 3 | 1 << 5 | 1 << 7,
];

/**
 * 佔領記錄
 */
let squareMark = 0;
let playersSquare = [0, 0];
let currnetPlayer = 0;

let step = 0;

// 玩家1 符號 O
const player1Symbol = `<svg viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3"  class="path circle-symbol" stroke-linecap="round" fill="transparent" />
</svg>`;

// 玩家2 符號 X
const player2Symbol = `<svg viewBox="0 0 100 100" width="100" height="100">
  <line x1="10" y1="10" x2="90" y2="90" stroke="black" stroke-width="3"  class="cross-path-1" stroke-linecap="round" />
  <line x1="90" y1="10" x2="10" y2="90" stroke="black" stroke-width="3"  class="cross-path-2" stroke-linecap="round" />
</svg>`;

const symbols = [player1Symbol, player2Symbol];

fromEvent(document.querySelector('.game-board'), 'click')
  .pipe(
    map((e) => ({ player: step % 2, event: e, squareValue: 1 << e.target.getAttribute('data-square-id') })),
    filter(e => !(squareMark & 1 << e.squareValue)),
  )
  .subscribe((action) => {
    const { event: e, player, squareValue } = action;
    step++;
    squareMark = squareMark | squareValue;
    writeLog('player' + (player+1) + ' 佔領 '+e.target.getAttribute('data-square-id'));
    e.target.innerHTML = symbols[player];
    playerSquare = playersSquare[player] | squareValue;
    playersSquare[player] = playerSquare;
    if (winFlag.some(v => v === playerSquare)){
      writeLog('player' + (player+1)+' 獲勝');
    }
  });

  function writeLog(msg){
      console.log(msg);
      var node = document.createElement("div");                 // Create a <li> node
      var textnode = document.createTextNode(msg);         // Create a text node
      node.appendChild(textnode);                              // Append the text to <li>
      document.querySelector('#history').appendChild(node);
  }
