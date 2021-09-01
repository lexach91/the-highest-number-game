var interval;
function runGame(){
    randomizeNumbers();
    clearInterval(interval);
    runTimer(1);
    document.addEventListener('keydown', function(e) {
        checkChoice(e);
    });
    
}


function checkChoice(event) {
    let choice = event.key;
    let num1 = parseInt(document.getElementById('num1').innerText);
    let num2 = parseInt(document.getElementById('num2').innerText);
    let num3 = parseInt(document.getElementById('num3').innerText);
    let num4 = parseInt(document.getElementById('num4').innerText);
    let rightChoice = Math.max(num1, num2, num3, num4);
    if (choice === "ArrowUp" && num1 === rightChoice) {
      incrementScore();
      randomizeNumbers();
      clearInterval(interval);
      runTimer(10);
    } else if (choice === "ArrowLeft" && num2 === rightChoice) {
      incrementScore();
      randomizeNumbers();
      clearInterval(interval);
      runTimer(10);
    } else if (choice === "ArrowRight" && num3 === rightChoice) {
      incrementScore();
      randomizeNumbers();
      clearInterval(interval);
      runTimer(10);
    } else if (choice === "ArrowDown" && num4 === rightChoice) {
      incrementScore();
      randomizeNumbers();
      clearInterval(interval);
      runTimer(10);
    }
}

function randomizeNumbers() {
    let numbers = document.getElementsByClassName('number');
    for (let num of numbers) {
        num.innerText = Math.floor(Math.random() * 100) + 1;
    }
}

function incrementScore() {
    let score = parseInt(document.getElementById('score').innerText);
    score++;
    document.getElementById("score").innerText = score;
}

function incrementRecord() {
    let score = parseInt(document.getElementById("score").innerText);
    let record = parseInt(document.getElementById("record").innerText);
    document.getElementById("record").innerText = score > record ? score : record;
}

function showRules() {
    document.getElementById('rules-modal').style.display = "flex";
    document.getElementById('rules-modal').style.animationName = "modal-appear";
    document.getElementById("close-rules").addEventListener('click', function() {
        document.getElementById("rules-modal").style.animationName = "modal-disappear";
        setTimeout(function() {
            document.getElementById("rules-modal").style.display = "none";

        }, 400);
    });
}

function showGameResults() {

}

function runTimer(time) {
    let timer = document.getElementsByClassName('timer')[0];
    let width = 100;
    interval = setInterval(function() {
        width--;
        timer.style.width = width + '%';    

    }, 100)
}

function endGame() {

}

document.getElementById('rules').addEventListener('click', showRules);
document.getElementById('start-game').addEventListener('click', runGame);