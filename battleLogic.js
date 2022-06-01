import {Enemy, Player} from "./entityClasses.js";
import {Action, attack} from "./actions.js";

const enemy = new Enemy("Green Dragon", false);
const player = new Player("Hero", true);
const actionQueue = [];
let currentTurn = player;

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
    }
}

function attackButton(){
    let currentAction = new Action(attack, player, enemy, 1000);
    actionQueue.push(currentAction);
    initiateTurn();
}

function initiateTurn(){
    currentTurn = null;
    showHideActions();
    runActions();
}

async function runActions(){
    let currentAction = actionQueue.pop();
    let myPromise = new Promise(function(resolve){
        setTimeout(function() {
            resolve();
            currentAction.act();
            if(actionQueue.length > 0){
                runActions();
            }
        }, currentAction.delay);
    })
}

setStatusDisplay();
setNameDisplay();
setButtons();