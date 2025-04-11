import { Request, Response } from "express";


const getProducts = async (req: Request, res:Response) => {
    try{
        console.log("Get products")
        res.send("Send products");
    }catch(e){
        console.log(e)
    }
}

export { getProducts };