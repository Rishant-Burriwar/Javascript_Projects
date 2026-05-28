import { spells } from "./spells.js";


let randPower = function(min,max){
    let power = Math.floor(Math.random()*(max-min +1) +min);
    return power;
}

let weightedChoice = function(scores){
    let total =scores.attack +scores.heal +scores.defense +scores.rest;

    let rand = Math.random() * total;
    if(rand < scores.attack){
        return "attack";
    }
    rand -= scores.attack;
    if(rand < scores.heal){
        return "heal";
    }
    rand -= scores.heal;
    if(rand < scores.defense){
        return "defense";
    }
    return "rest";
}

class Wizard{
    constructor(name,house,actor,alive){
        this.name = name;
        this.house = house;
        this.actor = actor;
        this.alive = alive;
        if(this.alive){
            this.health = 200;
            this.mana = 200;
        }
        else{
            this.health = 0;
            this.mana = 0;
        }
        this.power = randPower(90,100);
        this.spell = spells();
        this.def = {
            status:false,
            power:0
        }
        this.personality = {
            aggression : randPower(10,20),
            survival : randPower(10,20),
            caution : randPower(10,20)
        }
    }
    
    compareActionWeights(defender){

    let scores = {
        attack : 0,
        heal : 0,
        defense : 0,
        rest : 0
    };

    scores.heal += (100 - this.health) * 0.7;
    if(this.health < 30){
        scores.heal += 25;
        scores.defense += 5;
    }

    if(this.health > 70){
        scores.attack += 20;
    }

    scores.attack += (100 - defender.health) * 0.25;

    if(defender.health < 25){
        scores.attack += 25;
    }

    if(this.health > defender.health){
        scores.attack += 15;
    }

    if(this.health < defender.health){
        scores.defense += 5;
        scores.heal += 10;
    }

    if(!this.def.status){
        scores.defense += 10;
    }

    if(this.def.status){
        scores.attack += 10;
    }

    if(defender.def.status){
        scores.attack -= 10;
        scores.defense += 5;
    }

    if(this.mana < 20){
        scores.rest += 80;
        scores.attack -= 25;
    }

    else if(this.mana < 40){
        scores.rest += 50;
        scores.attack -= 25;
    }

    scores.attack += this.personality.aggression;
    scores.heal += this.personality.survival;
    scores.defense += this.personality.caution;

    scores.attack += Math.random() * 10;
    scores.heal += Math.random() * 10;
    scores.defense += Math.random() * 10;

    return weightedChoice(scores);
}

    chooseAction(defender){
        let action = this.compareActionWeights(defender);
        if(action === "attack"){
            return {action :"attack",defender : defender,spell : this.spell[0].name};
        }
        else if(action === "heal"){
            return {action :"heal",spell : this.spell[1].name};
        }
        else if(action === "defense"){
            return {action :"defense",spell :this.spell[2].name};
        }
        else{
            return {action :"rest"};
        }
    }

    performAction(action,defender,spellname){
        switch(action){
            case "attack" :{
                return this.attack(spellname,defender);
            }
            case "heal" :{
                return this.heal(spellname);
            }
            case "defense":{
                return this.defense(spellname);
            }
            case "rest" :{
                return this.rest();
            }
        }
    }

    takeDamage(attacker,attPow,attackspell){

        if(this.def.status){
            let defPow = this.def.power;
             if(defPow < attPow){
                attPow -= defPow;
                defPow = 0 
                this.def.power = defPow;
                this.def.status =false;
                this.health -= attPow;
                if(!this.healthCheck()){
                    return {success:false,error:"WIZARD_DEAD"}
                }
                return {success:true,type:"attack",attacker:attacker.name,defender:this.name,spell:attackspell.name,damage:attPow,shieldBroken:true}
            }

            else if(defPow>attPow){
                defPow -= attPow
                attPow =0
                this.def.power = defPow;
                return {success:true,type:"attack",attacker:attacker.name,defender:this.name,spell:attackspell.name,damage:0,shieldBlocked:true}
            }

            else{
                attPow = 0;
                this.def.power = 0;
                this.def.status =false;
                return {success:true,type:"attack",attacker:attacker.name,defender:this.name,spell:attackspell.name,damage:0,shieldBroken:true}
            }
        }
        
        this.health -= attPow;
        if(!this.healthCheck()){
            return {success:false,error:"WIZARD_DEAD"}
        }
        return {success:true,type:"attack",attacker:attacker.name,defender:this.name,spell:attackspell.name,damage:attPow}
    }

    rest(){
        let addMana = (this.power/10)*(this.health/10);
        this.mana += addMana;
        return {success:true,type :"rest",currentMana : this.mana}; 
    }

    attack(spellname,defender){
        let attackspell =this.spell.find((obj)=>obj.name===spellname)
        if(attackspell===undefined)
            return {success:false,error:"SPELL_NOT_FOUND"}
        if(attackspell.type !=="attack")
            return {success:false,error:"INVALID_ATTACK_SPELL"}
        
        if(!this.ConsumeMana(attackspell).success){
            return {success:false,error:"NOT_ENOUGH_MANA"};
        }
        let attPow = Math.round(this.power/20 + (randPower(attackspell.damage.min,attackspell.damage.max)))
        
        return defender.takeDamage(this,attPow,attackspell);
    }

    heal(spellname){
        if(!this.healthCheck()){
            return {success:false,error:"WIZARD_DEAD"}
        }

        let healthspell =this.spell.find((obj)=>obj.name===spellname)
        if(healthspell===undefined)
            return {success:false,error:"SPELL_NOT_FOUND"}
        if(healthspell.type !=="health")
            return {success:false,error:"INVALID_HEAL_SPELL"}

        if(!this.ConsumeMana(healthspell).success){
            return {success:false,error:"NOT_ENOUGH_MANA"};
        }
        let healPow = Math.round(this.power/20 + (randPower(healthspell.heal.min,healthspell.heal.max)));

        this.health += healPow

        if(this.health >100)
            this.health = 100;

        return {success:true,type:"heal",wizard:this.name,spell:healthspell.name,healAmount:healPow,currentHealth:this.health}
    }

    defense(spellname){
        if(!this.healthCheck()){
            return {success:false,error:"WIZARD_DEAD"}
        }

        if(this.def.status === true){
            return {success:false,error:"SHIELD_ALREADY_ACTIVE"}
        }

        let defspell =this.spell.find((obj)=>obj.name===spellname)
        if(defspell===undefined)
            return {success:false,error:"SPELL_NOT_FOUND"}
        if(defspell.type !=="defense")
            return {success:false,error:"INVALID_DEFENSE_SPELL"}

        if(!this.ConsumeMana(defspell).success){
            return {success:false,error:"NOT_ENOUGH_MANA"};
        }
        let defPow = Math.round(this.power/20 + randPower(defspell.shield.min,defspell.shield.max));
        this.def.status = true;
        this.def.power = defPow;
        return {success:true,type:"defense",wizard:this.name,spell:defspell.name,shieldPower:defPow}
    }

    healthCheck(){
        if(this.health <= 0){
            this.alive = false
            this.health = 0;
            return false
        }
        return true
    }

    ConsumeMana(spell){
        let manaNeeded =randPower(spell.manaCost.min,spell.manaCost.max);
        if(manaNeeded > this.mana){
            return {success:false};
        }
        this.mana -= manaNeeded;
        return {success:true};
    }
}

export {Wizard};