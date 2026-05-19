import {characters} from "./api.js";
import {Wizard} from "./wizardsClass.js"
import {hogwarts,search,getByHouse,stats} from "./hogwarts.js"

async function main(){

console.log("\n----WELCOME TO HOGWARTS----\n");

    try{
        let data = await characters();

        hogwarts.wizards = data.map((obj)=>{
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

    }
    catch(err){
        console.log(err)
    }
}

main();

