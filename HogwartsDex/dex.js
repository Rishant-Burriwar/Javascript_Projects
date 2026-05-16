import {characters} from "./api.js";
import {Wizard} from "./wizardsClass.js"
import {hogwarts} from "./hogwarts.js"

async function main(){

    let data = await characters();
    hogwarts.wizards = data.map((obj)=>{
        return new Wizard(
            obj.name,
            obj.house,
            obj.actor,
            obj.alive
        )
    })
}

main();

