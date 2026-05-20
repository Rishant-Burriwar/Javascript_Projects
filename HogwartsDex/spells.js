import { hogwarts } from "./hogwarts.js";

const validSpells = {
        attack : [
            {name:"stupefy",type:"attack",maxDamage:20},
            {name:"Sectumsempra",type:"attack", maxDamage:35},
            {name:"Incendio",type:"attack", maxDamage:25}
        ],
        heal : [
            {name:"Episkey",type:"health", maxHeal:15},
            {name:"Vulnera Sanentur",type:"health", maxHeal:35},
            {name:"Rennervate",type:"health", maxHeal:20}
        ],
        defense: [
            {name:"Protego",type:"defense", maxShield:15},
            {name:"Protego Maxima", type:"defense",maxShield:35},
            {name:"Fianto Duri",type:"defense", maxShield:25}
        ]
    }

let spells = function(){
    let spellList =[]
    for(let key in validSpells){
        spellList.push(validSpells[key][Math.floor(Math.random()*validSpells[key].length)])
    }
    return spellList;
}

let onlySpellName = function(wizobj){
    let spellNames = wizobj.spell.map((obj)=>obj.name)
    return spellNames;
}

export{spells,onlySpellName};