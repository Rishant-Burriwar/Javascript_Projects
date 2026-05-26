import { search } from "./hogwarts.js";

let startMatch =function(name1,name2){
    let res1 =search(name1);
    let res2 = search(name2);
    let validation = function(name1,name2){
        if(res1 === "INVALID INPUT" || res2 === "INVALID INPUT")
            return false;
        if(res1 === undefined || res2 === undefined)
            return false;
        if(res1.alive && res2.alive){
            return true
        }
        else{
            return false
        }
    }
    if(validation()){
        let gameObj =[res1,res2]
        return gameObj;
    }
    else{
        return "INVALID INPUT"
    }
}

function displayResult(result){

    if(!result.success){
        console.log(result.error);
        return;
    }

    if(result.type === "attack"){

        console.log(
            `${result.attacker} used ${result.spell}`
        );

        if(result.damage > 0){
            console.log(
                `${result.defender} lost ${result.damage} HP`
            );
        }

            if(result.shieldBlocked){
            console.log(
                `${result.defender}'s shield blocked the attack`
            );
        }

        if(result.shieldBroken){
            console.log(
                `${result.defender}'s shield shattered`
            );
        }

        if(result.defeated){
            console.log(
                `${result.defender} has been defeated`
            );
        }
    }


    else if(result.type === "heal"){

        console.log(
            `${result.wizard} restored ${result.healAmount} HP`
        );
    }

    else if(result.type === "defense"){

        console.log(
            `${result.wizard} activated a shield`
        );
    }
}

export {displayResult,startMatch}