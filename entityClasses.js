class Entity{
    constructor(inName, isPlayer){
        this.name = inName;
        this.isPlayer = isPlayer;
        this.dead = false;
    }
}

class LivingEntity extends Entity{
    constructor(inName, isPlayer){
        super(inName, isPlayer);

        this.maxHp = 10;
        this.curHp = 10;

        this.maxMp = 10;
        this.curMp = 10;

        this.attack = 100;
        this.defense = 5;

    }

    evaluateStatus(){
        if(this.curHp <= 0){
            this.dead = true;
        }
    }
}

export class Player extends LivingEntity{
    constructor(inName, isPlayer){
        super(inName, isPlayer);
    }
}

export class Enemy extends LivingEntity{
    constructor(inName, isPlayer){
        super(inName, isPlayer);
    }
}