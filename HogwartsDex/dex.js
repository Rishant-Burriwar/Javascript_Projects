import {characters} from "./api.js";
import {Wizard} from "./wizardsClass.js"
import {hogwarts,search} from "./hogwarts.js"

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

        let wizFind = search(123)
        if(wizFind === undefined){
            console.log("Wizard not Found");
        }
        else{
            console.log(wizFind);
        }

    }

    catch(err){
        console.log(err)
    }
}

main();

