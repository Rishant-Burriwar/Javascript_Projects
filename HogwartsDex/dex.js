import {characters} from "./api.js";
import {Wizard} from "./wizardsClass.js"
import {hogwarts,search,getByHouse,stats,startMatch} from "./hogwarts.js"
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

    console.log(
        x[0].attack(x[0].spell[0].name,x[1])
    );

    if(!x[1].alive)
        break;

    console.log(
        x[1].attack(x[1].spell[0].name,x[0])
    );
}

    }
    catch(err){
        console.log(err)
    }
}

main();

