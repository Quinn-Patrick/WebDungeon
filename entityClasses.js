class Entity{
    constructor(inName, isPlayer){
        this.name = inName;
        this.isPlayer = isPlayer;
    }
}

class LivingEntity extends Entity{
    constructor(inName, isPlayer){
        super(inName, isPlayer);

        this.maxHp = 10;
        this.curHp = 10;

        this.maxMp = 10;
        this.curMp = 10;

        this.attack = 5;
        this.defense = 5;
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