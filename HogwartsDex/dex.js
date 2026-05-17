import {characters} from "./api.js";
import {Wizard} from "./wizardsClass.js"
import {hogwarts,search,getByHouse} from "./hogwarts.js"

async function main(){

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
        let wizFind = search("hermione")
        if(wizFind === undefined){
            console.log("Wizard not Found");
        }
        else{
            console.log(wizFind);
        }

// FILTERING WIZARDS BY THEIR HOUSES
        let wizByHouse = getByHouse("ravenclaw")
        console.log(wizByHouse);





        
    }
    catch(err){
        console.log(err)
    }
}

main();

