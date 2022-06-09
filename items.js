import { initiateMessages, appendMessage } from "./message.js";
import {actionQueue, initiateAction} from "./battleLogic.js";

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
    console.log(count);
    inventory.unshift({
        content: item, 
        count: count
    });
    updateItemMenu();
}

export function takeItemByInventoryLocation(index, count){
    inventory[index].count -= count;
    if(inventory[index].count <= 0){
        inventory.splice(index, 1);
    }
    updateItemMenu();
}

export function takeItemById(itemId, count){
    for(let i = 0; i < inventory.length; i++){
        if(inventory[i].content.index === itemId){
            takeItemByInventoryLocation(i, count);
            return true;
        }
    }
    updateItemMenu();
    return false;
}

export function potionHeal(user, target){
    let amount = 50;
    itemHeal(target, amount)
}

function itemHeal(target, amount){
    appendMessage(target.name + " used a potion!");
    if(target.curHp + amount > target.maxHp){
        amount = target.maxHp - target.curHp;
        target.curHp = target.maxHp;
    }else{
        target.curHp += amount;
    }
    appendMessage(user.name + " recovers " + amount + " hit points!");
}

function updateItemMenu(){
    document.getElementById("itemMenu").innerHTML = "";
    inventory.forEach(addItemMenuElement);
}

function addItemMenuElement(item){
    document.getElementById("itemMenu").innerHTML += '<button id=' + item.content.name + '>' + item.content.name + " X" + item.count + '</button>';
    document.getElementById(item.content.name).addEventListener("click", () => {
        actionQueue.push(item.content.use); 
        initiateAction();
        takeItemById(item.content.index, 1);
    });
}