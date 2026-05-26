const validHouses = [
        "gryffindor",
        "slytherin",
        "hufflepuff",
        "ravenclaw"
    ]

let hogwarts = {
    wizards : []
}

let search = function(name){
    if(typeof name !== "string")
        return "INVALID_INPUT"

    if(name.trim() === ""){
        return "INVALID_INPUT"
    }
    let argname = name.toLowerCase()
    let wizFind = hogwarts.wizards.find((obj)=>{
        let objname = obj.name.toLowerCase()
        return objname.includes(argname);
    })
    return wizFind
}

let getByHouse = function(house){
    if(typeof house !== "string" || house.trim()==="")
        return "INVALID INPUT"
    let arghouse = house.toLowerCase()

    if(validHouses.includes(arghouse)){
        let wizByHouse = hogwarts.wizards
            .filter((wizobj)=>wizobj.house.toLowerCase() === arghouse)
            .map((wizobj)=>wizobj.name)
            return wizByHouse;
    }
    else{
        return "INVALID HOUSE NAME"
    }
}

let stats = function(){
    let statistics = {
        Total:hogwarts.wizards.length,
        Alive:0,
        Dead:0
    }
    for(let wizobj of hogwarts.wizards){
        if(wizobj.alive){
            statistics.Alive+=1
        }
        else{
            statistics.Dead+=1
        }
    }
    return statistics;
}

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

export {hogwarts,search,getByHouse,stats,startMatch,displayResult}