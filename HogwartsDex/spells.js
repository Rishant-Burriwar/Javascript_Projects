

const validSpells = {
        attack : [
            {name:"stupefy",type:"attack",maxDamage:20},
            {name:"sectumsempra",type:"attack", maxDamage:35},
            {name:"incendio",type:"attack", maxDamage:25}
        ],
        heal : [
            {name:"episkey",type:"health", maxHeal:15},
            {name:"vulnera sanentur",type:"health", maxHeal:35},
            {name:"rennervate",type:"health", maxHeal:20}
        ],
        defense: [
            {name:"protego",type:"defense", maxShield:15},
            {name:"protego paxima", type:"defense",maxShield:35},
            {name:"fianto duri",type:"defense", maxShield:25}
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