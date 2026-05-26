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
        this.def = {
            status:false,
            power:0
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
                return {success:true,type:"attack",attacker:attacker.name,defender:this.name,spell:attackspell.name,damage:attPow,shieldBroke:true}
            }

            else if(defPow>attPow){
                defPow -= attPow
                attPow =0
                this.def.power = defPow;
                return {success:true,type:"attack",attacker:attacker.name,defender:this.name,spell:attackspell.name,damage:0,shieldBroke:false}
            }

            else{
                attPow = 0;
                this.def.power = 0;
                this.def.status =false;
                return {success:true,type:"attack",attacker:attacker.name,defender:this.name,spell:attackspell.name,damage:0,shieldBroke:true}
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
        
        let attPow = Math.round(this.power/5 + (randPower(attackspell.maxDamage)))
        
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

        let healPow = Math.round(this.power/5 + (randPower(healthspell.maxHeal)));

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

        let defPow = Math.round(this.power/5 + randPower(defspell.maxShield));
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
}

export {Wizard};