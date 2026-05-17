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

export {hogwarts,search,getByHouse}