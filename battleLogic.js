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
    if(currentTurn.isPlayer){
        document.getElementById("actions").style.display = "block";
    }else{
        document.getElementById("actions").style.display = "none";
    }
}

function attackButton(){
    actionQueue.push(new Action(attack, player, enemy, 1000));
    initiateTurn();
}

function initiateTurn(){
    let currentAction = null;
    currentTurn = null;
    for(let i = 0; i < actionQueue.length; i++){
        if(currentAction === null || currentAction.finished){
            currentAction = actionQueue.pop();
            currentAction.act();
        }
    }
}

setStatusDisplay();
setNameDisplay();
setButtons();