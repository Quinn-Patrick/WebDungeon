import { initiateMessages, appendMessage } from "./message.js";
class Entity{
    constructor(inName, isPlayer, image){
        this.name = inName;
        this.isPlayer = isPlayer;
        this.dead = false;
        this.image = image;
    }
}

export class LivingEntity extends Entity{
    constructor(inName, isPlayer, image){
        super(inName, isPlayer, image);

        this.maxHp = 100;
        this.curHp = 100;

        this.maxMp = 10;
        this.curMp = 10;

        this.attack = 100;
        this.defense = 5;

        this.spells = [];
    }

    evaluateStatus(){
        if(this.curHp <= 0){
            if(!this.dead){
                appendMessage(this.name + " was slain!");
                initiateMessages();
            }

            this.dead = true;
        }
    }
}