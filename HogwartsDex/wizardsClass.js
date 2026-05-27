import { spells } from "./spells.js";


let randPower = function(min,max){
    let power = Math.floor(Math.random()*(max-min +1) +min);
    return power;
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
    }

    chooseAction(defender){

        // if(this.mana <20){
        //     return {
        //         action: "rest"
        //     }
        // }

        if(this.health < 30){
            return {
                action : "heal",
                spell : this.spell[1].name,
            }
        }

        else if(!this.def.status){
            return {
                action :"defense",
                spell : this.spell[2].name,
            }
        }
        else{
            return {
                action : "attack",
                spell : this.spell[0].name,
                defender : defender
            }
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

    attack(spellname,defender){
        let attackspell =this.spell.find((obj)=>obj.name===spellname)
        if(attackspell===undefined)
            return {success:false,error:"SPELL_NOT_FOUND"}
        if(attackspell.type !=="attack")
            return {success:false,error:"INVALID_ATTACK_SPELL"}
        
        if(!this.ConsumeMana(attackspell).success){
            return {success:false,error:"NOT_ENOUGH_MANA"};
        }
        let attPow = Math.round(this.power/5 + (randPower(attackspell.damage.min,attackspell.damage.max)))
        
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
        let healPow = Math.round(this.power/5 + (randPower(healthspell.heal.min,healthspell.heal.max)));

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
        let defPow = Math.round(this.power/5 + randPower(defspell.shield.min,defspell.shield.max));
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