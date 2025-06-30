import { AppDataSource } from "../config/conexion";
import { DeepPartial } from "typeorm";
import { BannerEntity } from "../entities/banner.entity";

const bannerRepo = AppDataSource.getRepository(BannerEntity);

const getAll = async () => {
    const response = await bannerRepo.find();
    return response;

}

const getById = async (id:number) => {
    const response = await bannerRepo.findOneBy({bnn_id: id})
    return response;
}

const create = async (data: DeepPartial<BannerEntity>) => { 
    const response = await bannerRepo.save(data);
    return response;
}

const update = async (data: DeepPartial<BannerEntity>, id:number) => {
    const response = await bannerRepo.update(id, data);
    return response;
}

const remove = async (id:number) => {
    const response = await bannerRepo.delete(id);
    return response
}

export { getAll, getById, create, update, remove };
