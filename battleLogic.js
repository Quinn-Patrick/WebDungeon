import {Enemy, Player} from "./entityClasses.js";
import {Action, attack} from "./actions.js";
import { initiateMessages, appendMessage, dialoguePromise } from "./message.js";

const enemy = new Enemy("Green Dragon", false, "greenDragon.png");
const player = new Player("Hero", true, null);
const actionQueue = [];
let currentTurn = player;
const turnQueue = [player, enemy];
let messagePromise;

function setStatusDisplay(){
    document.getElementById("playerHP").innerHTML = "HP: " + player.curHp;
    document.getElementById("playerMP").innerHTML = "MP : " + player.curMp;
    setImageDisplay();
    setNameDisplay();
}

function setNameDisplay(){
    if(!enemy.dead){
        document.getElementById("monsterName").innerHTML = enemy.name;
    }else{
        document.getElementById("monsterName").innerHTML = "Safety";
    }
}

function setImageDisplay(){
    if(!enemy.dead){
        document.getElementById("monsterSprite").src = enemy.image;
    }else{
        document.getElementById("monsterSprite").style.display = none;
    }
}

function setButtons(){
    document.getElementById("atkButton").addEventListener("click", attackButton);
}

async function initiateTurn(){
    await dialoguePromise;
    if(currentTurn !== null && currentTurn.dead){
        endTurn();
    }
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
    turnQueue.push(turnQueue.shift());
    for(let i of turnQueue){
        i.evaluateStatus();
        if(enemy.dead){
            document.getElementById("monsterSprite").style.opacity = 0;
        }
    }
    currentTurn = turnQueue[0];
    console.log("Turn Order:" + turnQueue[0].name + ", " + turnQueue[1].name);
    initiateTurn();
}

function chooseEnemyAction(){
    let currentAction = new Action(attack, enemy, player, 1000);
    document.getElementById("actions").style.display = "none";
    actionQueue.push(currentAction);
    initiateAction();
}



setStatusDisplay();

setButtons();
console.log("Turn Order:" + turnQueue[0].name + ", " + turnQueue[1].name);