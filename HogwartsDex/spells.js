const validSpells = {
        attack : [
            {name:"stupefy",maxDamage:20},
            {name:"Sectumsempra", maxDamage:35},
            {name:"Incendio", maxDamage:25}
        ],
        heal : [
            {name:"Episkey", maxHeal:15},
            {name:"Vulnera Sanentur", maxHeal:35},
            {name:"Rennervate", maxHeal:20}
        ],
        denense: [
            {name:"Protego", maxShield:15},
            {name:"Protego Maxima", maxShield:35},
            {name:"Fianto Duri", maxShield:25}
        ]
    }

let spells = function(){
    let spellList =[]
    for(let key in validSpells){
        spellList.push(validSpells[key][Math.floor(Math.random()*validSpells[key].length)])
    }
    return spellList;
}

export{spells};