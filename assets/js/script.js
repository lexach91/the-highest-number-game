var interval;
var timeOut;
var dataset = [
  { round: 0, points: 0 },
];
var currentRound = 0;
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
      if(num1 === rightChoice){
        document.getElementById("up").classList.add("blink");
        setTimeout(function () {
          document.getElementById("up").classList.remove("blink");
        }, 300);
      } else if (num2 === rightChoice){
        document.getElementById("left").classList.add("blink");
        setTimeout(function () {
          document.getElementById("left").classList.remove("blink");
        }, 300);
      } else if (num3 === rightChoice) {
        document.getElementById("right").classList.add("blink");
        setTimeout(function () {
          document.getElementById("right").classList.remove("blink");
        }, 300);
      } else {
        document.getElementById("down").classList.add("blink");
        setTimeout(function () {
          document.getElementById("down").classList.remove("blink");
        }, 300);
      }
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
      // document.dispatchEvent(endGameEvent);
      showGameResults();
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
      document.getElementById("up").classList.add('blink');
      setTimeout(function() {
        document.getElementById("num1").classList.remove("rotate");
        document.getElementById("up").classList.remove("blink");
      }, 300)  
      incrementScore();
      runGame();
    } else if (choice === 37 && num2 === rightChoice) {
      document.getElementById("num2").classList.add("rotate");
      document.getElementById("left").classList.add("blink");
      setTimeout(function () {
        document.getElementById("num2").classList.remove("rotate");
        document.getElementById("left").classList.remove("blink");
      }, 300);  
      incrementScore();
      runGame();
    } else if (choice === 39 && num3 === rightChoice) {
      document.getElementById("num3").classList.add("rotate");
      document.getElementById("right").classList.add("blink");
      setTimeout(function () {
        document.getElementById("num3").classList.remove("rotate");
        document.getElementById("right").classList.remove("blink");
      }, 300);  
      incrementScore();
      runGame();
    } else if (choice === 40 && num4 === rightChoice) {
      document.getElementById("num4").classList.add("rotate");
      document.getElementById("down").classList.add("blink");
      setTimeout(function () {
        document.getElementById("num4").classList.remove("rotate");
        document.getElementById("down").classList.remove("blink");
      }, 300);  
      incrementScore();
      runGame();
    } else {
      clearInterval(interval);
      clearTimeout(timeOut);
      document.getElementsByClassName("timer")[0].style.width = 0 + "%";
      // document.dispatchEvent(endGameEvent);
      showGameResults();
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
  document.getElementById("close-rules").focus();
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
    let currentScore = parseInt(document.getElementById("score").innerText);
    let result = { round: currentRound, points: currentScore };
    dataset.push(result);
    render(dataset);
    clearInterval(interval);
    clearTimeout(timeOut); 
    document.removeEventListener("keydown", checkChoiceForKeyboard);
    let numbers = document.getElementsByClassName("number");
    for (let number of numbers) {
      number.removeEventListener("click", checkChoiceForClick);
      number.style.cursor = "default";
      number.innerText = 0;
    }
    incrementRecord();
    document.getElementById("gameover-score").innerText =
      document.getElementById("score").innerText;
    document.getElementById("gameover-record").innerText =
      document.getElementById("record").innerText;
    document.getElementById("score").innerText = 0;
    currentRound++;
    
    document.getElementById("endgame-modal").style.display = "flex";
    document.getElementById("endgame-modal").style.animationName = "modal-appear";
    document.getElementById("close-modal").focus();
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
    
    if (
      endGame() &&
      document.getElementById("endgame-modal").style.display !== "flex"
    ) {
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

// D3

const svg = d3
  .select("#statistics")
  // .attr("preserveAspectRatio", "xMinYMin meet")
  // .attr("viewBox", "0 0 600 600");

const height = +svg.attr("height");
const width = +svg.attr("width");

const render = (data) => {
  d3.selectAll("svg > *").remove();
  const title = "Your Statistics";
  const xValue = (d) => d.round;
  const xAxisLabel = "Round";

  const yValue = (d) => d.points;
  const yAxisLabel = "Points";

  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = d3.scaleLinear()
   .domain([0, d3.max(data, xValue)])
   .range([0, innerWidth])
   .nice();

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, yValue)])
    .range([innerHeight, 0])
    .nice();

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const xAxis = d3.axisBottom(xScale)
    .tickSize(-innerHeight)
    .tickPadding(5)
    .ticks(currentRound);
  
  const yAxisTicks = yScale.ticks().filter((tick) => Number.isInteger(tick));

  const yAxis = d3
    .axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(5)
    .tickValues(yAxisTicks)
    .tickFormat(d3.format("d"));
    
  const yAxisG = g.append('g').call(yAxis);

  // yAxisG.selectAll(".domain").remove();
  yAxisG.append("text")
    .attr("class", "axis-label")
    .attr("y", -20)
    .attr("x", -innerHeight / 2)
    .attr("fill", "black")
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .text(yAxisLabel);

  const xAxisG = g
    .append("g")
    .call(xAxis)
    .attr("transform", `translate(0,${innerHeight})`);
    
  xAxisG.select(".domain").remove();
  
  xAxisG.append("text")
    .attr("class", "axis-label")
    .attr("y", 20)
    .attr("x", innerWidth / 2)
    .attr("fill", "black")
    .text(xAxisLabel);

  const lineGenerator = d3
    .line()
    .x((d) => xScale(xValue(d)))
    .y((d) => yScale(yValue(d)))
    .curve(d3.curveBasis);

  g.append("path")
    .attr("class", "line-path")
    .attr("d", lineGenerator(data));

  g.append("text").attr("class", "title").attr("y", -10).text(title);
};
