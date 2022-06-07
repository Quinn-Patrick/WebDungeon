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
    let damage = computeDamage(user, target);
    target.curHp -= damage;
    appendMessage(user.name + " hit " + target.name + " for " + damage + " damage!");
    initiateMessages();
}