import { fork } from "child_process";


const getRandom = (req, res)=>{
    const { cant } = req.query
    const childProcess = fork("./src/child.js");
    const quantity = cant ? cant : 100000000;

    childProcess.send(quantity)

    childProcess.on("message",(response)=>{
        res.json(response)
    } )
}



export const controller = {getRandom}