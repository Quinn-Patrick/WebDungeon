export class room{
    constructor(){
        //These variables will correspond to rooms that can be reached via those directions
        this.north = null;
        this.east = null;
        this.south = null;
        this.west = null;

        this.monster = null;

        //There can be multiple treasures in one room
        this.treasure = [];
    }
}