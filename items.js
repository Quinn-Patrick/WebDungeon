const inventory = [];

export class item {
    constructor(index, name, use){
        this.index = index;
        this.name = name;
        this.use = use;
    }
}

export function stockItem(item, count){
    for(let i = 0; i < inventory.length; i++){
        if(item.index === inventory[i].content.index){
            inventory[i].count += count;
            return;
        }
    }
    inventory.unshift({item, count});
}

export function takeItemByInventoryLocation(index, count){
    inventory[index].count -= count;
    if(inventory[index].count <= 0){
        inventory.splice(index, 1);
    }
}