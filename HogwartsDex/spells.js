

const validSpells = {
        attack : [
            {name:"stupefy",type:"attack",damage:{min:10,max:20},manaCost:{min:10,max:15}},
            {name:"sectumsempra",type:"attack",damage:{min:20,max:35},manaCost:{min:25,max:40}},
            {name:"incendio",type:"attack",damage:{min:15,max:25},manaCost:{min:15,max:25}}
        ],
        heal : [
            {name:"episkey",type:"health",heal:{min:5,max:15},manaCost:{min:8,max:15}},
            {name:"vulnera sanentur",type:"health",heal:{min:20,max:35},manaCost:{min:25,max:40}},
            {name:"rennervate",type:"health",heal:{min:10,max:20},manaCost:{min:12,max:22}}
        ],
        defense: [
            {name:"protego",type:"defense",shield:{min:5,max:15},manaCost:{min:10,max:18}},
            {name:"protego paxima",type:"defense",shield:{min:20,max:35},manaCost:{min:25,max:40}},
            {name:"fianto duri",type:"defense",shield:{min:12,max:25},manaCost:{min:15,max:28}}
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