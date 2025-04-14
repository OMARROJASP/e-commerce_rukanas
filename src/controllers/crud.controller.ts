import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handler";

export function createCrudController<T>(service: {
    getAll: () => Promise<T[]>;
    getById: (id:number) => Promise<T | null>;
    create: (data: Partial<T>) => Promise<T>;
    update: (id: number, data: Partial<T>) => Promise<T | null>;
    remove: (id:number) => Promise<T | null>;
}){
    return{
        getAll: async (req: Request, res: Response) => {
            try{
                const data = await service.getAll();
                res.send({message: "GET_ALL", data: data});
            }catch(e){
            handleHttp(res, "ERROR_GET_ALL")
            }
        }
    }
}