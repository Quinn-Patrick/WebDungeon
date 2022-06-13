import { appendMessage } from "./message.js";
import {actionQueue, initiateAction} from "./battleLogic.js";

export class spell {
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
    let damage = Math.floor((Math.random() * 9) + 1);
    target.curHp -= damage;
    appendMessage(user.name + " casts flames!");
    appendMessage(user.name + " hits " + target.name + " for " + damage + " damage!");
}