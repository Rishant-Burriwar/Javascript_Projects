
const validSpells = {
        attack : [
    {name:"stupefy",type:"attack",damage:{min:10,max:20},manaCost:{min:10,max:15},cooldown:1},
    {name:"sectumsempra",type:"attack",damage:{min:20,max:35},manaCost:{min:15,max:25},cooldown:2},
    {name:"incendio",type:"attack",damage:{min:15,max:25},manaCost:{min:10,max:22},cooldown:1},
    {name:"confringo",type:"attack",damage:{min:18,max:30},manaCost:{min:14,max:24},cooldown:2},
    {name:"bombarda",type:"attack",damage:{min:16,max:28},manaCost:{min:13,max:23},cooldown:2},
    {name:"bombarda maxima",type:"attack",damage:{min:30,max:50},manaCost:{min:28,max:40},cooldown:4},
    {name:"diffindo",type:"attack",damage:{min:14,max:22},manaCost:{min:10,max:18},cooldown:1},
    {name:"expulso",type:"attack",damage:{min:25,max:40},manaCost:{min:22,max:34},cooldown:3},
    {name:"reducto",type:"attack",damage:{min:20,max:33},manaCost:{min:18,max:30},cooldown:2},
    {name:"flipendo",type:"attack",damage:{min:8,max:18},manaCost:{min:6,max:14},cooldown:0},
    {name:"depulso",type:"attack",damage:{min:12,max:24},manaCost:{min:10,max:20},cooldown:1},
    {name:"expelliarmus",type:"attack",damage:{min:10,max:20},manaCost:{min:8,max:16},cooldown:1},
    {name:"crucio",type:"attack",damage:{min:25,max:38},manaCost:{min:24,max:36},cooldown:4},
    {name:"avada kedavra",type:"attack",damage:{min:80,max:100},manaCost:{min:50,max:70},cooldown:6}
],

heal : [
    {name:"episkey",type:"health",heal:{min:5,max:15},manaCost:{min:8,max:15}},
    {name:"vulnera sanentur",type:"health",heal:{min:20,max:35},manaCost:{min:20,max:28}},
    {name:"rennervate",type:"health",heal:{min:10,max:20},manaCost:{min:12,max:22}},
    {name:"ferula",type:"health",heal:{min:8,max:18},manaCost:{min:10,max:18}},
    {name:"brackium emendo",type:"health",heal:{min:15,max:25},manaCost:{min:14,max:24}},
    {name:"essence of dittany",type:"health",heal:{min:18,max:30},manaCost:{min:16,max:26}},
    {name:"anapneo",type:"health",heal:{min:7,max:17},manaCost:{min:9,max:16}},
    {name:"enervate",type:"health",heal:{min:12,max:24},manaCost:{min:12,max:20}},
    {name:"sanentur",type:"health",heal:{min:16,max:28},manaCost:{min:15,max:25}}
],

defense : [
    {name:"protego",type:"defense",shield:{min:5,max:15},manaCost:{min:10,max:18}},
    {name:"protego paxima",type:"defense",shield:{min:20,max:35},manaCost:{min:25,max:32}},
    {name:"fianto duri",type:"defense",shield:{min:12,max:25},manaCost:{min:15,max:27}},
    {name:"protego maxima",type:"defense",shield:{min:25,max:45},manaCost:{min:28,max:38}},
    {name:"protego horribilis",type:"defense",shield:{min:22,max:40},manaCost:{min:24,max:35}},
    {name:"protego totalum",type:"defense",shield:{min:18,max:35},manaCost:{min:20,max:30}},
    {name:"salvio hexia",type:"defense",shield:{min:15,max:30},manaCost:{min:16,max:28}},
    {name:"cave inimicum",type:"defense",shield:{min:14,max:28},manaCost:{min:15,max:25}},
    {name:"repello inimicum",type:"defense",shield:{min:16,max:32},manaCost:{min:18,max:28}},
    {name:"finite incantatem",type:"defense",shield:{min:10,max:20},manaCost:{min:10,max:20}}
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

export{spells,onlySpellName,validSpells};