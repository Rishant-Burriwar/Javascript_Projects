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



export {hogwarts,search}