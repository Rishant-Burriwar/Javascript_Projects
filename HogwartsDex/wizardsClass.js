import { spells } from "./spells.js";
import { startMatch } from "./hogwarts.js";

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

    attack(spellname,defender){
        if(this.spell.find((obj)=>obj.name===spellname).type !=="attack")
            return "CHOSE WRONG SPELL"
        let attPow = this.power/5 + (randPower(this.spell[0].maxDamage));
        defender.health -= attPow;
        return `${this.name} used ${this.spell[0].name}\n${defender.name} Lost ${attPow} health points`
    }
}

export {Wizard};