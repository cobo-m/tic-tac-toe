/**
 * Tic Tac Toe
 *
 * A Tic Tac Toe game in HTML/JavaScript/CSS.
 *
 * No dependencies - Uses Vanilla JS
 *
 * @author: Vasanth Krishnamoorthy
 */
var N_SIZE = 3,
  EMPTY = '&nbsp;',
  boxes = [],
  turn = 'X',
  score,
  moves,
  counter = 0,
  modulus = 1,
  height = 110,
  width = 110,
  random = Math.floor(Math.random()*N_SIZE*N_SIZE);

let turnCheckbox = document.getElementById("playerTurn");
let goingFirst = document.getElementById("turn1");
let goingSecond = document.getElementById("turn2");
let matrixSelect = document.getElementById("matrix");
let modeTurn = document.getElementById("playerMode");

let turnSound = new Audio("sounds/bone-break.mp3");
turnSound.volume = 1;

let gameEnd = new Audio("sounds/game-end.mp3");
let backgroundTrack = new Audio("sounds/background-track.mp3");
backgroundTrack.volume = 0.3;
backgroundTrack.loop = true;

/**
 * Initializes the Tic Tac Toe board and starts the game.
 */

modeTurn.addEventListener("click", function() {
  if(modeTurn.checked === true) {
    document.getElementsByClassName("mode")[1].classList.add("shine");
    document.getElementsByClassName("mode")[0].classList.remove("shine");
    document.getElementById('board-id').remove();
    document.getElementsByClassName("turn")[0].style.display = "block";
    document.getElementsByClassName("turn")[1].style.display = "block";
    document.getElementsByClassName("turn")[2].style.display = "block";
    document.getElementsByClassName("turn")[3].style.display = "block";
    init();
  }
  else {
    document.getElementsByClassName("mode")[0].classList.add("shine");
    document.getElementsByClassName("mode")[1].classList.remove("shine");
    document.getElementById('board-id').remove();
    document.getElementsByClassName("turn")[0].style.display = "none";
    document.getElementsByClassName("turn")[1].style.display = "none";
    document.getElementsByClassName("turn")[2].style.display = "none";
    document.getElementsByClassName("turn")[3].style.display = "none";
    init();
  }
});


matrixSelect.addEventListener("click", function() {
    if (document.getElementById("mat3").checked === true) {
      document.getElementById('board-id').remove();
      document.getElementsByClassName("matrix-1")[0].style.boxShadow = "0 0 10px #676961";
      document.getElementsByClassName("matrix-2")[0].style.boxShadow = "0 0 0px #676961";
      document.getElementsByClassName("matrix-3")[0].style.boxShadow = "0 0 0px #676961";
      N_SIZE = 3;
      height = 110;
      width = 110;
      init();
    }
    if (document.getElementById("mat4").checked === true) {
      document.getElementById('board-id').remove();
      document.getElementsByClassName("matrix-1")[0].style.boxShadow = "0 0 0px #676961";
      document.getElementsByClassName("matrix-2")[0].style.boxShadow = "0 0 10px #676961";
      document.getElementsByClassName("matrix-3")[0].style.boxShadow = "0 0 0px #676961";
      N_SIZE = 4;
      height = 110;
      width = 110;
      init();
    }
    if (document.getElementById("mat6").checked === true) {
      document.getElementById('board-id').remove();
      document.getElementsByClassName("matrix-1")[0].style.boxShadow = "0 0 0px #676961";
      document.getElementsByClassName("matrix-2")[0].style.boxShadow = "0 0 0px #676961";
      document.getElementsByClassName("matrix-3")[0].style.boxShadow = "0 0 10px #676961";
      N_SIZE = 6;
      height = 75;
      width = 75;
      init();
    }
  });


function init() {
  var board = document.createElement('table');
  board.setAttribute('border', 1);
  board.setAttribute('cellspacing', 0);
  board.id = "board-id";
  var identifier = 1;

  for (var i = 0; i < N_SIZE; i++) {
    var row = document.createElement('tr');
    board.appendChild(row);
    for (var j = 0; j < N_SIZE; j++) {
      var cell = document.createElement('td');
      cell.setAttribute('height', height);
      cell.setAttribute('width', width);
      cell.setAttribute('align', 'center');
      cell.setAttribute('valign', 'center');
      cell.classList.add('col' + j, 'row' + i);
      cell.id = "id" + counter;
      if (i == j) {
        cell.classList.add('diagonal0');
      }
      if (j == N_SIZE - i - 1) {
        cell.classList.add('diagonal1');
      }
      cell.identifier = identifier;
      cell.addEventListener('click', set);
      row.appendChild(cell);
      boxes.push(cell);
      identifier += identifier;
      counter++;
    }
  }
  counter = 0;
  document.getElementById('tictactoe').appendChild(board);
  
  startNewGame();
  
  turnCheckbox.addEventListener("click", function() {
    if (turnCheckbox.checked === true) {
      simulate(document.getElementById("id"+random), "click");
      modulus = 0;
      turn = "O";
      startNewGame();
      goingFirst.style.transform = "translate(301px, -43px)";
      goingSecond.style.transform = "translate(202px, -43px)";
    }
    else {
      modulus = 1;
      turn = "X";
      startNewGame();
      goingFirst.style.transform = "translate(202px, -43px)";
      goingSecond.style.transform = "translate(301px, -43px)";
    }
  });
}

/**
 * New game
 */
function startNewGame() {
  score = {
    'X': 0,
    'O': 0
  };
  moves = 0;
  turn = 'X';
  boxes.forEach(function (square) {
    square.innerHTML = EMPTY;
  });
}

/**
 * Check if a win or not
 */
function win(clicked) {
  // Get all cell classes
  var memberOf = clicked.className.split(/\s+/);
  for (var i = 0; i < memberOf.length; i++) {
    var testClass = '.' + memberOf[i];
    var items = contains('#tictactoe ' + testClass, turn);
    // winning condition: turn == N_SIZE
    if (items.length == N_SIZE) {
      return true;
    }
  }
  return false;
}

/**
 * Helper function to check if NodeList from selector has a particular text
 */
function contains(selector, text) {
  var elements = document.querySelectorAll(selector);
  return [].filter.call(elements, function (element) {
    return RegExp(text).test(element.textContent);
  });
}

/**
 * Sets clicked square and also updates the turn.
 */
function set() {
  if (this.innerHTML !== EMPTY) {
    return;
  }
  this.innerHTML = turn;  // turn
    turnSound.play();
    backgroundTrack.play();
    let zz = 0;
    while ((document.getElementById("id"+random).innerHTML == "O" || document.getElementById("id"+random).innerHTML == "X") && zz < 300) {
      random = Math.floor(Math.random()*N_SIZE*N_SIZE);
      if(moves > N_SIZE*N_SIZE - 3) {
        zz++;
      }
    }
  moves += 1;
  score[turn] += this.identifier;
  if (win(this)) {
    gameEnd.play();
    alert('Winner: Player ' + turn);
    startNewGame();
  } else if (moves === N_SIZE * N_SIZE) {
    gameEnd.play();
    alert('Draw');
    startNewGame();
  } else {
    turn = turn === 'X' ? 'O' : 'X';
    document.getElementById('turn').textContent = 'Player ' + turn;
  }
  
  if (moves % 2 === modulus && modeTurn.checked === true) {
    setTimeout(simulateDelay, 800);
  }
}

function simulateDelay() {
  simulate(document.getElementById("id"+random), "click");
}

// Simulate computer click
function simulate(element, eventName)
{
    var options = extend(defaultOptions, arguments[2] || {});
    var oEvent, eventType = null;

    for (var name in eventMatchers)
    {
        if (eventMatchers[name].test(eventName)) { eventType = name; break; }
    }

    if (!eventType)
        throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

    if (document.createEvent)
    {
        oEvent = document.createEvent(eventType);
        if (eventType == 'HTMLEvents')
        {
            oEvent.initEvent(eventName, options.bubbles, options.cancelable);
        }
        else
        {
            oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
            options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
            options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
        }
        element.dispatchEvent(oEvent);
    }
    else
    {
        options.clientX = options.pointerX;
        options.clientY = options.pointerY;
        var evt = document.createEventObject();
        oEvent = extend(evt, options);
        element.fireEvent('on' + eventName, oEvent);
    }
    return element;
}

function extend(destination, source) {
    for (var property in source)
      destination[property] = source[property];
    return destination;
}

var eventMatchers = {
    'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
    'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
}
var defaultOptions = {
    pointerX: 0,
    pointerY: 0,
    button: 0,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    bubbles: true,
    cancelable: true
}
function removeElement(id) {
    var elem = document.getElementById(id);
    return elem.parentNode.removeChild(elem);
}

init();
