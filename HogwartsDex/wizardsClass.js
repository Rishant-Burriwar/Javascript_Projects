import { spells,validSpells } from "./spells.js";


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
        this.cooldownSpell = {}
    }
    
    compareActionWeights(defender){

    let scores = {
        attack : 0,
        heal : 0,
        defense : 0,
        rest : 0
    };

    scores.heal += (200 - this.health) * 0.7;
    if(this.health < 30){
        scores.heal += 25;
        scores.attack -= 20;
        scores.defense += 5;
    }

    if(this.health > 120){
        scores.heal -= 25;
        scores.defense -= 15;
        scores.attack += 20;
    }

    if(this.health > 70){
        scores.heal -= 25;
        scores.attack += 20;
    }

    scores.attack += (200 - defender.health) * 0.25;

    if(defender.health < 25){
        scores.heal -= 10;
        scores.defense -= 10;
        scores.attack += 25;
    }

    if(this.health > defender.health){
        scores.defense -= 5;
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

    cooldownDecrement(){
        for(let spellname in this.cooldownSpell){
            if(this.cooldownSpell[spellname]>0)
                this.cooldownSpell[spellname]--;
        }
    }

    chooseBestDefenseSpell(defender){
        let bestSpell =null;
        let bestscore = -Infinity;
        for(let spellObj of validSpells.defense){
            let score = 0;
            if(this.cooldownSpell[spellObj.name] === 0){
                if(this.mana < 40){
                    score -= spellObj.manaCost.max*2;
                }
                if(defender.def.status){
                score += spellObj.shield.max*0.7;
                }
                if(spellObj.shield.max >= defender.health && defender.health <30){
                    score += 10;
                }
                if(score > bestscore){
                    bestscore = score;
                    bestSpell = spellObj;
                }
            }
        }
       
        return bestSpell;
    }

    chooseBestAttackSpell(defender){
        let bestSpell =null;
        let bestscore = -Infinity;
        for(let spellObj of validSpells.attack){
            let score = 0;
            if(this.cooldownSpell[spellObj.name] === 0 || this.cooldownSpell[spellObj.name] === undefined){
                if(this.mana < 40){
                    score -= spellObj.manaCost.max*2;
                }
                if(defender.def.status){
                score += spellObj.damage.max*0.7;
                }
                if(spellObj.damage.max >= defender.health && defender.health <30){
                    score += 10;
                }
                if(score > bestscore){
                    bestscore = score;
                    bestSpell = spellObj;
                }
        }
    }
        this.cooldownSpell[bestSpell.name] = bestSpell.cooldown;
        return bestSpell;
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
                    return {success:true,type:"attack",attacker:attacker.name,defender:this.name,spell:attackspell.name,damage:attPow,defeated:true}
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
            return {success:true,type:"attack",attacker:attacker.name,defender:this.name,spell:attackspell.name,damage:attPow,defeated:true}
        }
        return {success:true,type:"attack",attacker:attacker.name,defender:this.name,spell:attackspell.name,damage:attPow}
    }

    rest(){
        let addMana = (this.power/10)*(this.health/10) + this.personality.survival*0.8;
        this.mana += addMana;
        return {success:true,type :"rest",currentMana : this.mana}; 
    }

    attack(spellname,defender){
        this.cooldownDecrement();
        let attackspell =this.chooseBestAttackSpell(defender);
        if(!this.ConsumeMana(attackspell).success){
            return {success:false,error:"NOT_ENOUGH_MANA"};
        }
        let attPow = Math.round(this.power/20 + (randPower(attackspell.damage.min,attackspell.damage.max)))
        return defender.takeDamage(this,attPow,attackspell);
    }

    heal(spellname){
        this.cooldownDecrement();
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

        if(this.health >200)
            this.health = 200;

        return {success:true,type:"heal",wizard:this.name,spell:healthspell.name,healAmount:healPow,currentHealth:this.health}
    }

    defense(spellname){
        this.cooldownDecrement();
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