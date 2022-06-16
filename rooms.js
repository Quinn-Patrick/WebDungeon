import { appendMessage, initiateMessages } from "./message.js";
import { actionQueue, initiateAction, room } from "./battleLogic.js";

export class Room{
    constructor(){
        //These variables will correspond to rooms that can be reached via those directions
        this.exits = {
            north: null,
            south: null,
            east: null,
            west: null
        };

        this.enemy = null;

        //There can be multiple treasures in one room
        this.treasure = [];
    }
}

export function enterRoom(nextRoom, direction){
    if(nextRoom === null){
        appendMessage("You cannot go that way.");
        initiateMessages();
        return;
    }

    room = nextRoom;
    document.getElementById("travelMenu").innerHTML = "";
    if(room.north) addRoomMenuElement("north");
    if(room.south) addRoomMenuElement("south");
    if(room.east) addRoomMenuElement("east");
    if(room.west) addRoomMenuElement("west");

    appendMessage("Entered the " + direction + " room.");
    initiateMessages();
}

function addRoomMenuElement(direction){
    document.getElementById("travelMenu").innerHTML += '<button id=' + direction + '>' + direction + '</button>';
    document.getElementById(direction).addEventListener("click", (direction) => {
        enterRoom(room.exits.direction);
    });
}