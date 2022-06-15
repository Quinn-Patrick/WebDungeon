import {LivingEntity} from "./entityClasses.js";
import {Action, attack} from "./actions.js";
import { initiateMessages, appendMessage } from "./message.js";
import { stockItem, takeItemByInventoryLocation, item, potionHeal } from "./items.js";
import { learnSpell, Spell, flames } from "./spells.js";

const enemy = new LivingEntity("Green Dragon", false, "greenDragon.png");
const player = new LivingEntity("Hero", true, null);
export const actionQueue = [];
let currentTurn = player;
const turnQueue = [player, enemy];

function setStatusDisplay(){
    document.getElementById("playerHP").innerHTML = "HP: " + player.curHp;
    document.getElementById("playerMP").innerHTML = "MP : " + player.curMp;
    setImageDisplay();
    setNameDisplay();
}

function setNameDisplay(){
    if(enemy != null && !enemy.dead){
        document.getElementById("monsterName").innerHTML = enemy.name;
    }else{
        document.getElementById("monsterName").innerHTML = "Safety";
    }
}

function setImageDisplay(){
    if(enemy != null && !enemy.dead){
        document.getElementById("monsterSprite").src = enemy.image;
    }else{
        document.getElementById("monsterSprite").style.display = "none";
    }
}

function setButtons(){
    document.getElementById("atkButton").addEventListener("click", attackButton);
}

async function initiateTurn(){
    await initiateMessages();
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
    
    actionQueue.push(currentAction);
    initiateAction();
}

export function initiateAction(){
    document.getElementById("actions").style.display = "none";
    currentTurn = null;
    runActions();
}

async function runActions(){
    let currentAction = actionQueue.pop();
    let delayTime = 0;
    if(currentAction === undefined){
        delayTime = 0;
    }else{
        delayTime = currentAction.delay;
    }

    let myPromise = new Promise(function(resolve){
        setTimeout(function() {
            resolve();
            if(currentAction !== undefined){
                currentAction.act();
            }
            setStatusDisplay();
            if(actionQueue.length > 0){
                runActions();
            }else{
                endTurn();
            }
        }, delayTime);
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
    setStatusDisplay();
    initiateTurn();
}

function chooseEnemyAction(){
    let currentAction = new Action(attack, enemy, player, 1000);
    document.getElementById("actions").style.display = "none";
    actionQueue.push(currentAction);
    initiateAction();
}

setStatusDisplay();
stockItem(new item(0, "Potion", new Action(potionHeal, player, player, 1000)), 1);
learnSpell(player, new Spell(0, "Flames", new Action(flames, player, enemy, 1000), 5));
setButtons();
console.log("Turn Order:" + turnQueue[0].name + ", " + turnQueue[1].name);