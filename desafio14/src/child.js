const randomInt = () => {
    return Math.floor(Math.random() * 1001);
};

const getRandom = (quantity)=>{
    let result = {};


    for(let i =  1; i < quantity; i++){
        const randomNumber = randomInt()

        result[randomNumber] = result[randomNumber] ? result[randomNumber] + 1 : 1
    }

    return result
}

process.on("message",(quantity)=>{
    const response = getRandom(quantity)

    process.send(response)
})