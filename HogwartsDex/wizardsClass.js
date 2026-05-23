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
        this.def = {
            status:false,
            power:0
        }
    }

    attack(spellname,defender){
        let attackspell =this.spell.find((obj)=>obj.name===spellname)
        if(attackspell===undefined)
            return "INVALID INPUT"
        if(attackspell.type !=="attack")
            return "CHOSE WRONG SPELL TYPE"

        let attPow = Math.round(this.power/5 + (randPower(attackspell.maxDamage)))

        if(defender.def.status === true){
            let defPow = defender.def.power
            if(defPow < attPow){
                attPow -= defPow;
                defPow = 0 
                defender.def.power = defPow;
                defender.def.status =false;
                defender.health -= attPow;
                if(!defender.healthCheck()){
                    return `${defender.name} is Dead`
                }
                return `${this.name} used ${attackspell.name}\n${defender.name} Lost ${attPow} health points and Shield is Deactivated`
            }
            else if(defPow > attPow){
                defPow -= attPow
                attPow =0
                defender.def.power = defPow;
                return `${this.name} used ${attackspell.name}\n${defender.name} Lost ${attPow} health points Beacuse of Shield`
            }
            else{
                attPow = 0;
                defender.def.power = 0;
                defender.def.status =false;
                return `${this.name} used ${attackspell.name}\n${defender.name} Lost ${attPow} health points Beacuse of Shield`
            }
        }

        defender.health -= attPow;

        if(!defender.healthCheck()){
            return `${defender.name} is Dead`
        }

        return `${this.name} used ${attackspell.name}\n${defender.name} Lost ${attPow} health points`
    }

    heal(spellname){
        if(!this.healthCheck()){
            return `${this.name} is Dead`
        }

        let healthspell =this.spell.find((obj)=>obj.name===spellname)
        if(healthspell===undefined)
            return "INVALID INPUT"
        if(healthspell.type !=="health")
            return "CHOSE WRONG SPELL TYPE"

        let healPow = Math.round(this.power/5 + (randPower(healthspell.maxHeal)));

        this.health += healPow

        if(this.health >100)
            this.health = 100;

        return `${this.name} used ${healthspell.name} to increase health points by ${healPow}`
    }

    defense(spellname){
        if(!this.healthCheck()){
            return `${this.name} is Dead`
        }

        if(this.def.status === true){
            return "Shield Already Activated"
        }

        let defspell =this.spell.find((obj)=>obj.name===spellname)
        if(defspell===undefined)
            return "INVALID INPUT"
        if(defspell.type !=="defense")
            return "CHOSE WRONG SPELL TYPE"

        let defPow = Math.round(this.power/5 + randPower(defspell.maxShield));
        this.def.status = true;
        this.def.power = defPow;
        return "Shield Activated"
    }

    healthCheck(){
        if(this.health <= 0){
            this.alive = false
            this.health = 0;
            return false
        }
        return true
    }
}

export {Wizard};