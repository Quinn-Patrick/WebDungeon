export function computeDamage(user, target){
    let attack = user.attack;
    let defense = target.defense;

    let difference = attack - defense;
    if(difference < 0){
        return Math.floor(Math.random() * 4);
    }else{
        let maxDamage = Math.floor(difference / 2);

        if(maxDamage < 4){
            maxDamage = 4;
        }

        let minDamage = Math.floor(maxDamage / 2);
        let range = maxDamage - minDamage;

        let damage = Math.floor(Math.random() * range + minDamage);

        console.log("Inflicted " + damage + " to " + target.name);

        return damage;
    }
}