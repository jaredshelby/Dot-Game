const startButton = document.getElementById('start-button'),
      pauseScreen = document.getElementById('paused'),
      gameBoard = document.getElementById('game-board');
      

let dotSpeedSlider = document.getElementById('speed-slider'),
    dotSpeed = parseInt(document.getElementById('speed-slider').value),
    gameScoreDisplay = document.getElementById('total-score'),
    gameScore = 0,
    gameActive = false,
    gameRunning;

dotSpeedSlider.addEventListener('input', function () {
  dotSpeed = parseInt(document.getElementById('speed-slider').value);
}, false);

startButton.onclick = function() {
  if(gameActive) {
    gameActive = false;
    clearInterval(gameRunning);
    startButton.innerText = 'START';
    pauseScreen.classList.remove('hidden');
  } else {
    gameActive = true;
    gameRunning = setInterval(initializeDot, 1000);
    startButton.innerText = 'PAUSE';
    pauseScreen.classList.add('hidden');
  }
}

function initializeDot() {
  
  let dot = document.createElement('span'),
      dotSize = Math.floor(Math.random() * 90 + 10),
      dotPosition = Math.floor((gameBoard.offsetWidth - (dotSize)) * Math.random()),
      dotPoints = 11 - parseInt(dotSize * 0.1);
  
  dot.setAttribute('class', 'dot');
  dot.setAttribute('points', dotPoints);
  dot.style.height = dotSize + 'px';  
  dot.style.width = dotSize + 'px';
  dot.style.left = dotPosition + 'px';
  dot.style.top =  parseInt(0 - dotSize) + 'px';
  dot.style.backgroundColor = generateRandomColor();
  dot.addEventListener('click', dotClick);
  gameBoard.appendChild(dot);
  moveDot();
}

function generateRandomColor() {
    let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
}

function dotClick() {
  if(gameActive) {
    gameScore += parseInt(this.getAttribute('points'));
    gameScoreDisplay.innerText = gameScore;
    this.remove();
  }
}

//Below, need to make array of all dots and animate them one by one

function moveDot() {   
  let dotArray = document.querySelectorAll('.dot'),
      move = setInterval(movement, 1000);
  
  function movement() {
    for (let i = 0; i < dotArray.length; i++) {
      let topPos = parseInt(dotArray[i].style.top),
          topAdd = topPos + dotSpeed;
      
      if (topPos > gameBoard.offsetHeight) {
        clearInterval(move);
        dotArray[i].remove();
      }
      if (gameActive == false) {
        clearInterval(move);
      }
      dotArray[i].style.top = topAdd + 'px';
      
    }
  }
}


// TO DO:   Make Pause sign over screen when paused
//          Fiddle with animation
//          Test in browser
