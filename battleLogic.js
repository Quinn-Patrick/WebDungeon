import {Enemy, Player} from "./entityClasses.js";
import {Action, attack} from "./actions.js";

const enemy = new Enemy("Green Dragon", false);
const player = new Player("Hero", true);
const actionQueue = [];
let currentTurn = player;
const turnQueue = [player, enemy];

function setStatusDisplay(){
    document.getElementById("playerHP").innerHTML = "HP: " + player.curHp;
    document.getElementById("playerMP").innerHTML = "MP : " + player.curMp;
}

function setNameDisplay(){
    document.getElementById("monsterName").innerHTML = enemy.name;
}

function setButtons(){
    document.getElementById("atkButton").addEventListener("click", attackButton);
}

function showHideActions(){
    if(currentTurn !== null && currentTurn.isPlayer){
        document.getElementById("actions").style.display = "block";
    }else{
        document.getElementById("actions").style.display = "none";
        chooseEnemyAction();
    }
}

function attackButton(){
    let currentAction = new Action(attack, player, enemy, 1000);
    document.getElementById("actions").style.display = "none";
    actionQueue.push(currentAction);
    initiateAction();
}

function initiateAction(){
    currentTurn = null;
    turnQueue.push(turnQueue.shift());
    runActions();
}

async function runActions(){
    let currentAction = actionQueue.pop();
    let myPromise = new Promise(function(resolve){
        setTimeout(function() {
            resolve();
            currentAction.act();
            setStatusDisplay();
            if(actionQueue.length > 0){
                runActions();
            }else{
                endTurn();
            }
        }, currentAction.delay);
    })
}

function endTurn(){
    currentTurn = turnQueue[0];
    console.log("Turn Order:" + turnQueue[0].name);
    showHideActions();
}

function chooseEnemyAction(){
    let currentAction = new Action(attack, enemy, player, 1000);
    document.getElementById("actions").style.display = "none";
    actionQueue.push(currentAction);
    initiateAction();
}

setStatusDisplay();
setNameDisplay();
setButtons();
console.log("Turn Order:" + turnQueue[0].name + ", " + turnQueue[1].name);