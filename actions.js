import {computeDamage} from "./battleUtility.js";
import { initiateMessages, appendMessage } from "./message.js";

export class Action{
    constructor(effect, user, target, delay){
        this.effect = effect;
        this.user = user;
        this.target = target;
        this.delay = delay;

        this.finished = false;
    }

    act(){
        this.effect(this.user, this.target);
    }
}

export function attack(user, target){
    if(target.dead){
        appendMessage("No target...");
        return;
    }
    let damage = computeDamage(user, target);
    target.curHp -= damage;
    appendMessage(user.name + " attacks!");
    appendMessage(user.name + " hits " + target.name + " for " + damage + " damage!");
}