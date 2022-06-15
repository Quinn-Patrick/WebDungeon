import { appendMessage } from "./message.js";
import {actionQueue, initiateAction} from "./battleLogic.js";

export class Spell {
    constructor(index, name, use, cost){
        this.index = index;
        this.name = name;
        this.use = use;
        this.cost = cost;
    }
}

export function flames(user, target){
    if(target.dead){
        appendMessage("No target...");
        return;
    }
    let damage = Math.floor((Math.random() * 20) + 20);
    target.curHp -= damage;
    appendMessage(user.name + " casts flames!");
    appendMessage(user.name + " hits " + target.name + " for " + damage + " damage!");
}

export function learnSpell(entity, newSpell){
    entity.spells.push(newSpell);
    updateMagicMenu(entity);
}

function updateMagicMenu(entity){
    if(!entity.isPlayer) return;
    document.getElementById("magicMenu").innerHTML = "";

    for(let s of entity.spells){
        addMagicMenuElement(entity, s);
    }
}

function addMagicMenuElement(entity, spell){
    document.getElementById("magicMenu").innerHTML += '<button id=' + spell.name + '>' + spell.name + ' (' + spell.cost + ')</button>';
    document.getElementById(spell.name).addEventListener("click", () => {
        if(entity.curMp < spell.cost){
            appendMessage("Not enough magic!");
            initiateAction();
            return;
        }
        entity.curMp -= spell.cost;
        actionQueue.push(spell.use); 
        initiateAction();
    });
}