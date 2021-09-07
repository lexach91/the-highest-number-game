var interval;
var timeOut;
// var score = 0;
function runGame() {
  randomizeNumbers();
  clearInterval(interval);
  let timeForRound;
  if (parseInt(document.getElementById("score").innerText) <= 5) {
    timeForRound = 100;
  } else if (parseInt(document.getElementById("score").innerText) <= 10) {
    timeForRound = 80;
  } else if (parseInt(document.getElementById("score").innerText) <= 15) {
    timeForRound = 50;
  } else if (parseInt(document.getElementById("score").innerText) <= 20) {
    timeForRound = 30;
  } else {
      timeForRound = 15;
  }
  runTimer(timeForRound);  
  document.addEventListener("keydown", checkChoiceForKeyboard, { once: true });
  let numbers = document.getElementsByClassName('number')
  for (let number of numbers) {
      number.addEventListener('click', checkChoiceForClick, {once: true});
      number.style.cursor = 'pointer';
  }
  
}
function checkChoiceForClick(event) {
    let choice = parseInt(event.target.innerText);
    let num1 = parseInt(document.getElementById("num1").innerText);
    let num2 = parseInt(document.getElementById("num2").innerText);
    let num3 = parseInt(document.getElementById("num3").innerText);
    let num4 = parseInt(document.getElementById("num4").innerText);
    let rightChoice = Math.max(num1, num2, num3, num4);
    if (choice === rightChoice) {
      event.target.classList.add("rotate");
      setTimeout(function () {
        event.target.classList.remove("rotate");
      }, 300);    
      incrementScore();
      runGame();
    } else {
      clearInterval(interval);
      clearTimeout(timeOut);
      document.getElementsByClassName("timer")[0].style.width = 0 + "%";
      document.dispatchEvent(endGameEvent);
    }

}
function checkChoiceForKeyboard(event) {
  if (event.repeat) {
    return false;
  } else {
    let choice = event.keyCode;
    let num1 = parseInt(document.getElementById("num1").innerText);
    let num2 = parseInt(document.getElementById("num2").innerText);
    let num3 = parseInt(document.getElementById("num3").innerText);
    let num4 = parseInt(document.getElementById("num4").innerText);
    let rightChoice = Math.max(num1, num2, num3, num4);
    if (choice === 38 && num1 === rightChoice) {
      document.getElementById("num1").classList.add('rotate');
      setTimeout(function() {
        document.getElementById("num1").classList.remove("rotate");
      }, 300)  
      incrementScore();
      runGame();
    } else if (choice === 37 && num2 === rightChoice) {
      document.getElementById("num2").classList.add("rotate");
      setTimeout(function () {
        document.getElementById("num2").classList.remove("rotate");
      }, 300);  
      incrementScore();
      runGame();
    } else if (choice === 39 && num3 === rightChoice) {
      document.getElementById("num3").classList.add("rotate");
      setTimeout(function () {
        document.getElementById("num3").classList.remove("rotate");
      }, 300);  
      incrementScore();
      runGame();
    } else if (choice === 40 && num4 === rightChoice) {
      document.getElementById("num4").classList.add("rotate");
      setTimeout(function () {
        document.getElementById("num4").classList.remove("rotate");
      }, 300);  
      incrementScore();
      runGame();
    } else {
      clearInterval(interval);
      clearTimeout(timeOut);
      document.getElementsByClassName("timer")[0].style.width = 0 + "%";
      document.dispatchEvent(endGameEvent);
    }
  }  
  
}

function randomizeNumbers() {
  let numbers = document.getElementsByClassName("number");
  for (let number of numbers) {
      number.innerText = Math.floor(Math.random() * 100) + 1;
  }
}

function incrementScore() {
  let score = parseInt(document.getElementById("score").innerText);
  score++;
  document.getElementById("score").innerText = score;
//   document.getElementById("score").innerText = ++score;
}

function incrementRecord() {
  let score = parseInt(document.getElementById("score").innerText);
  let record = parseInt(document.getElementById("record").innerText);
  document.getElementById("record").innerText = score > record ? score : record;
}

function showRules() {
  clearTimeout(timeOut);
  document.getElementById("rules-modal").style.display = "flex";
  document.getElementById("rules-modal").style.animationName = "modal-appear";
  document.getElementById("close-rules").addEventListener("click", close);
  window.onclick = function(e) {
      if(e.target === document.getElementById("rules-modal")) {
          close();
      }
  }

  window.onkeydown = function(e) {
      if(e.key === 'Escape') {
          close();
      }
  }

  function close() {
    document.getElementById("rules-modal").style.animationName =
      "modal-disappear";
    setTimeout(function () {
      document.getElementById("rules-modal").style.display = "none";
    }, 400);
  }
}

function showGameResults() {
    document.getElementById("endgame-modal").style.display = "flex";
    document.getElementById("endgame-modal").style.animationName = "modal-appear";
    document.getElementById("close-modal").addEventListener("click", close);
    window.onclick = function (e) {
      if (e.target === document.getElementById("endgame-modal")) {
        close();
      }
    };

    window.onkeydown = function (e) {
      if (e.key === "Escape") {
        close();
      }
    };

    function close() {
      document.getElementById("endgame-modal").style.animationName =
        "modal-disappear";
      setTimeout(function () {
        document.getElementById("endgame-modal").style.display = "none";
      }, 400);
    }
}

function runTimer(time) {
  let timer = document.getElementsByClassName("timer")[0];
  let width = 100;
  interval = setInterval(function () {
    width--;
    timer.style.width = width + "%";
  }, time);
  timeOut = setTimeout(function () {
    if (endGame()) {
      document.dispatchEvent(endGameEvent);
    }
  }, 100 * time);
}

function endGame() {
  return document.getElementsByClassName("timer")[0].style.width === "0%";
}

const endGameEvent = new Event('endgame');

document.addEventListener(
  "endgame",
  function () {
    document.removeEventListener("keydown", checkChoiceForKeyboard);
    let numbers = document.getElementsByClassName("number");
    for (let number of numbers) {
      number.removeEventListener("click", checkChoiceForClick);
      number.style.cursor = "default";
    }
    incrementRecord();
    document.getElementById("gameover-score").innerText = document.getElementById("score").innerText;
    document.getElementById("gameover-record").innerText = document.getElementById("record").innerText;
    document.getElementById("score").innerText;
    showGameResults();
    // console.log("END GAME WORKS");
  }
);

// document.dispatchEvent(endGameEvent);
document.getElementById("rules").addEventListener("click", showRules);
document.getElementById("start-game").addEventListener("click", function () {
  document.getElementById("score").innerText = 0;
  runGame();
});
