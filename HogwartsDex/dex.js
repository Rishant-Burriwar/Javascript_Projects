import {characters} from "./api.js";
import {Wizard} from "./wizardsClass.js"
import {hogwarts,search,getByHouse,stats} from "./hogwarts.js"
import { displayResult,startMatch } from "./duel.js";
import { onlySpellName } from "./spells.js";
import data from "./data.json" with {type : "json"}

async function main(){

console.log("\n----WELCOME TO HOGWARTS----\n");

    try{
        let chardata = data;

        hogwarts.wizards = chardata.map((obj)=>{
            return new Wizard(
                obj.name,
                obj.house,
                obj.actor,
                obj.alive
            )
        })

// FINDING A WIZARD
        let wizFind = search("severus")
        if(wizFind === undefined){
            console.log("Wizard not Found");
        }
        else{
            console.log(wizFind);
        }

// FILTERING WIZARDS BY THEIR HOUSES
        let wizByHouse = getByHouse("ravenclaw")
        console.log(wizByHouse);

// STATISTICS OF HOGWARTS [TOTAL,ALIVE,DEAD]
        let statistics = stats()
        console.log("TOTAL: ",statistics.Total)
        console.log("ALIVE: ",statistics.Alive)
        console.log("DEAD: ",statistics.Dead)

let x =startMatch("harry","ron")
while(x[0].alive && x[1].alive){

    let move1 = x[0].chooseAction(x[1]);
    let result1 = x[0].performAction(move1.action,move1.defender,move1.spell)
    displayResult(result1);
    if(!x[1].alive){
        break;
    }
    let move2 = x[1].chooseAction(x[0]);
    let result2 = x[1].performAction(move2.action,move2.defender,move2.spell)
    displayResult(result2);
}

    }
    catch(err){
        console.log(err)
    }
}

main();

