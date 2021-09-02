var interval;
var score = 0;
function runGame() {
  randomizeNumbers();
  clearInterval(interval);
  runTimer(50);  
  document.addEventListener("keydown", checkChoice ,{once: true});
  
}

function checkChoice(event) {
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
      incrementScore();
      runGame();
    } else if (choice === 37 && num2 === rightChoice) {
      incrementScore();
      runGame();
    } else if (choice === 39 && num3 === rightChoice) {
      incrementScore();
      runGame();
    } else if (choice === 40 && num4 === rightChoice) {
      incrementScore();
      runGame();
    } else {
      randomizeNumbers();
      runGame();
      console.log("Else happened");
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
  //   let score = 0;
  //   score = parseInt(document.getElementById("score").innerText);
  //   score++;
  document.getElementById("score").innerText = ++score;
}

function incrementRecord() {
  let score = parseInt(document.getElementById("score").innerText);
  let record = parseInt(document.getElementById("record").innerText);
  document.getElementById("record").innerText = score > record ? score : record;
}

function showRules() {
  document.getElementById("rules-modal").style.display = "flex";
  document.getElementById("rules-modal").style.animationName = "modal-appear";
  document.getElementById("close-rules").addEventListener("click", function () {
    document.getElementById("rules-modal").style.animationName =
      "modal-disappear";
    setTimeout(function () {
      document.getElementById("rules-modal").style.display = "none";
    }, 400);
  });
  
}

function showGameResults() {}

function runTimer(time) {
  let timer = document.getElementsByClassName("timer")[0];
  let width = 100;
  interval = setInterval(function () {
    width--;
    timer.style.width = width + "%";
  }, time);
  setTimeout(function () {
      if (endGame()) {
        document.dispatchEvent(endGameEvent);
      }  

  }, 100 * time)
}

function endGame() {
  return document.getElementsByClassName("timer")[0].style.width === "0%";
}

const endGameEvent = new Event('endgame');

document.addEventListener(
  "endgame",
  function () {
    document.removeEventListener("keydown", checkChoice);
    console.log("END GAME WORKS");
  },
  { once: true }
);

// document.dispatchEvent(endGameEvent);
document.getElementById("rules").addEventListener("click", showRules);
document.getElementById("start-game").addEventListener("click", function () {
  document.getElementById("score").innerText = 0;
  runGame();
});
