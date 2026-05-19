import { spells } from "./spells.js";

let randPower = function(range){
    let power = Math.floor(Math.random()*(range-10) +10);
    return power;
}

class Wizard{
    constructor(name,house,actor,alive){
        this.name = name;
        this.house = house;
        this.actor = actor;
        this.alive = alive;
        if(this.alive){
            this.health = 100;
        }
        else{
            this.health = 0;
        }
        this.power = randPower(30);
        this.spell = spells();
    }
}

export {Wizard};