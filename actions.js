import {computeDamage} from "./battleUtility.js";

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
        setTimeout(() => this.finished = true, this.delay);
    }
}

export function attack(user, target){
    target.curHp -= computeDamage(user, target);
}