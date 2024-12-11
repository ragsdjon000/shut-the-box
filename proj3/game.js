const dice1Img = document.querySelector("#diceImg1");
const dice2Img = document.querySelector("#diceImg2");
const btnStart = document.querySelector("#startBtn");
const btnRoll = document.querySelector("#roll");
const btnInd = document.querySelector("#individualDice");
const btnSum = document.querySelector("#sumOfDice");
const btnEnd = document.querySelector("#endTurn");
const input1Name = document.querySelector("#player1Name");
const input2Name = document.querySelector("#player2Name");
const boxes = [0, 0, 0, 0, 0, 0 ,0 ,0 ,0, 0];
let p1Name;
let p2Name;

let turn;
let round = 1;
let dice1Value;
let dice2Value;
let p1TotPoints = 0;
let p2TotPoints = 0;


btnStart.addEventListener('click',function(){
    p1Name = input1Name.value.trim();
    p2Name = input2Name.value.trim();
    turn = p1Name;
    const gameBoard = document.querySelector("#board")
    const dice = document.querySelector("#dice")
    const scorecard = document.querySelector("#scorecard")
    const buttons = document.querySelector("#buttons")
    const names = document.querySelector("#names")
    const winner = document.querySelector("#winner")

    if (p1Name != '' && p2Name != ''){
        document.querySelector("#tp1name").textContent = p1Name;
        document.querySelector("#tp2name").textContent = p2Name;
        document.querySelector('#currentTurn').textContent = turn + "'s Turn";
        btnRoll.disabled = false;
        gameBoard.style.display = "block";
        dice.style.display = "flex";
        scorecard.style.display = "block";
        buttons.style.display = "block";
        names.style.display = "none";
        winner.style.display = "none";
    }else{
        alert('Please Enter Names');
    };
});

btnRoll.addEventListener('click',function(){
    const dice1Num = Math.floor(Math.random() * 6) + 1;
    const dice2Num = Math.floor(Math.random() * 6) + 1;
    dice1Value = dice1Num;
    dice2Value = dice2Num;
    dice1Img.innerHTML = `<i class="bi bi-dice-` + dice1Num +`" style="font-size: 100px;"></i>`
    dice2Img.innerHTML = `<i class="bi bi-dice-` + dice2Num +`" style="font-size: 100px;"></i>`

    if((dice1Value === dice2Value) || (boxes[dice1Value] === "X") || (boxes[dice2Value] === "X")){
        btnInd.disabled = true;
    }else{
        btnInd.disabled = false;
    }

    if((dice1Value + dice2Value) > 9 || (boxes[dice1Value + dice2Value] === "X")){
        btnSum.disabled = true;
    }else{
        btnSum.disabled = false;
    }

    if(btnInd.disabled && btnSum.disabled){
        btnEnd.disabled = false;
    }

    btnRoll.disabled = true;
    document.querySelector("#sum").textContent = "Sum: " + (dice1Value + dice2Value);
    document.querySelector("#roundText").textContent = "Round " + round;
});

function shut(boxNumber){
    const box = document.querySelector("#box" + boxNumber)
    box.classList.add('shut');
    box.textContent = "X";
}

btnInd.addEventListener('click', function(){
    shut(dice1Value);
    shut(dice2Value);
    boxes[dice1Value] = "X";
    boxes[dice2Value] = "X";
    boxes[0] = boxes[0] + dice1Value + dice2Value;
    btnSum.disabled = true;
    btnInd.disabled = true;
    btnRoll.disabled = false;
});


btnSum.addEventListener('click', function(){
    shut(dice1Value + dice2Value);
    boxes[dice1Value + dice2Value] = "X";
    boxes[0] = boxes[0] + dice1Value + dice2Value;
    btnSum.disabled = true;
    btnInd.disabled = true;
    btnRoll.disabled = false;
});

btnEnd.addEventListener('click', function(){
    if (turn === p1Name){
        const points = 45 - boxes[0];
        p1TotPoints = p1TotPoints + points;
        const newRow = buildRow(round, points);
        document.getElementById("tbody").insertAdjacentElement('beforeend', newRow);
        turn = p2Name;
    } else if(turn === p2Name){
        const points = 45 - boxes[0];
        p2TotPoints = p2TotPoints + points;
        const td2 = document.querySelector("#round" + round + " .p2Pts");
        td2.textContent = points;
        round++;
        turn = p1Name;
    }
    resetBoard();
    document.querySelector('#currentTurn').textContent = turn + "'s Turn";
    document.querySelector('#roundText').textContent = "Round " + round;
    btnEnd.disabled = true;
    btnRoll.disabled = false;
    if (round > 5 && (turn === p1Name)) {
        gameOver();
        btnRoll.disabled = true;
    }
    if (round > 6 & (turn === p2Name)){
        gameOver();
    }
});


function buildRow(roundNum, points){
    const newTr = document.createElement("tr");
    const newTh = document.createElement("th");
    const newtd1 = document.createElement("td");
    const newtd2 = document.createElement("td");
    newTr.id = "round" + roundNum;
    newTh.textContent = "Round " + roundNum;
    newtd1.classList.add("p1Pts");
    newtd1.textContent = points;
    newtd2.classList.add("p2Pts");
    newTr.insertAdjacentElement('beforeend', newTh);
    newTr.insertAdjacentElement('beforeend', newtd1);
    newTr.insertAdjacentElement('beforeend', newtd2);
    return newTr;
}

function resetBoard(){
    boxes.fill(0);
    const boxList = document.querySelectorAll(".box")
    for (let i = 0; i < boxList.length; i++) {
        boxList[i].textContent = i + 1;
        boxList[i].classList.remove("shut");
      }
}

function gameOver(){
    document.querySelector(".board").style.display = "none";
    document.querySelector(".dice").style.display = "none";
    document.querySelector(".buttons").style.display = "none";
    document.querySelector("#winner").style.display = "block";
    document.querySelector("#bonusBtn").style.display = "none";
    if(p1TotPoints < p2TotPoints){
        document.querySelector(".winnerText").textContent = p1Name + " has won the game with the score of " + p1TotPoints + " !! " + p2Name + "had a score of " + p2TotPoints + ".";
    } else if (p2TotPoints < p1TotPoints){
        document.querySelector(".winnerText").textContent = p2Name + " has won the game with the score of " + p2TotPoints + " !! " + p1Name + "had a score of " + p1TotPoints + ".";
    } else if (p1TotPoints === p2TotPoints){
        document.querySelector(".winnerText").textContent = p1Name + " and " + p2Name + " tied with a score of " + p1TotPoints + " each."
        document.querySelector("#bonusBtn").style.display = "block";
    }
}

document.querySelector("#playAgainBtn").addEventListener('click', function(){
    document.querySelector("#names").style.display = "block";
    document.querySelector("#scorecard").style.display = "none";
    document.querySelector("#winner").style.display = "none";
    p1Name = '';
    p2Name = '';
    round = 1;
    p1TotPoints = 0;
    p2TotPoints = 0;
    document.querySelector("#roundText").textContent = "Round 1";
    document.querySelector("#player1Name").value = '';
    document.querySelector("#player2Name").value = '';
    document.querySelector("table").innerHTML = '<thead> <tr> <th></th> <th id = "tp1name">Player1</th> <th id = "tp2name">Player2</th> </tr> </thead> <tbody id = "tbody"> <!-- this will be our scorecard --> </tbody>';
});

document.querySelector("#bonusBtn").addEventListener('click', function(){
    document.querySelector(".board").style.display = "block";
    document.querySelector(".dice").style.display = "block";
    document.querySelector(".buttons").style.display = "block";
    document.querySelector("#winner").style.display = "none";
    btnRoll.disabled = false;
    btnEnd.disabled = true;
    btnInd.disabled = true;
    btnSum.disabled = true;

});
