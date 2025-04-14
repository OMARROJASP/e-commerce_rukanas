import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handler";

export function createCrudController<T>(service: {
  getAll: () => Promise<any[]>,
  getById: (id: number) => Promise<any>,
  create: (data: Partial<any>) => Promise<any>,
  update: (data: Partial<any>, id: number) => Promise<any>,
  remove: (id: number) => Promise<any>,
}) {
  return {
    getAll: async (req: Request, res: Response) => {
      try {
        const data = await service.getAll();
        res.send({ message: "GET_ALL", data: data });
      } catch (e) {
        handleHttp(res, "ERROR_GET_ALL");
      }
    },

    getById: async (req: Request, res: Response) => {
      try {
        const id = parseInt(req.params.id);
        const data = await service.getById(id);
        res.send({ message: "GET_BY_ID", data: data || "No se encontró" });
      } catch (e) {
        console.log(e)
        handleHttp(res, "ERROR_GET_BY_ID");
      }
    },

    create: async (req: Request, res: Response) => {
      try {
        const data = await service.create(req.body);
        res.send({ message: "CREATED", data: data });
      } catch (e) {
        console.log(e)
        handleHttp(res, "ERROR_CREATE");
      }
    },

    update: async (req: Request, res: Response) => {
      try {
        const id = parseInt(req.params.id);
        const data = await service.update(req.body, id);
        res.send({ message: "UPDATED", data: data });
      } catch (e) {
        handleHttp(res, "ERROR_UPDATE");
      }
    },

    remove: async (req: Request, res: Response) => {
      try {
        const id = parseInt(req.params.id);
        const data = await service.remove(id);
        res.send({ message: "DELETED", data: data });
      } catch (e) {
        handleHttp(res, "ERROR_DELETE");
      }
    }
  };
}
