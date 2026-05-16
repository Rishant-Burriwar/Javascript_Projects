async function characters(){
    let data = await fetch("https://hp-api.onrender.com/api/characters")
    let chardata = await data.json()
    return chardata;
}

export {characters}