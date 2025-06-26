import { Between, Equal, IsNull } from "typeorm";
import { AppDataSource } from "../config/conexion";
import { ProductEntity } from "../entities/product.entity";
import { Product } from "../interface/product.interface";
import { MoreThan } from "typeorm";

const productRepo = AppDataSource.getRepository(ProductEntity);

const getProducts = async () => {
    const response = await productRepo.find();
   return response;
}

const getProductsByOfert = async () => {
    const response = await productRepo.find(
        {
             where: {
      prod_ofert: MoreThan(0),
    },
        }
    );
   return response;
}

const getProductById = async (id: number) => {
    if (isNaN(id)) {
        throw new Error("El ID del producto no es un número válido");
    }

    const response = await productRepo.findOneBy({ prod_id: id });
    return response;
}


const insertProduct = async (product:Product) => {
    const response = await productRepo.save(product);
    return response;
}

const updateProduct = async (product:Product, id:number) => {
    const response = await productRepo.update(id, product);
    return response;
}

const deleteProduct = async (id:number) => {
    const response = await productRepo.delete(id);
    return response
}

// Peticiones para filtrado de productos por categoria

const getFilterProducts = async (category?:string, min?:number, max?:number, page:number = 1, limit:number = 10, ofert:boolean = false) => {
    

    const where: any = {};


    if ( category ) {
        where.prod_category = Equal(category)
    }
    if ( ofert ) {
        where.prod_ofert =  MoreThan(0)
    }

    if ( min != null && max != null ){
        where.prod_price = Between(min, max);
    }else if (min != null ){
        where.prod_price = Between(min, Number.MAX_SAFE_INTEGER);
    } else if (max != null) {
        where.prod_price = Between(0, max);
    }

    const skip = (page - 1) * limit;

    // 1. obtengo productos del filtro
    const totalItems = await productRepo.find({ where });

    // 2. Productos Paginados
    const products = await productRepo.find({
        where, 
        skip,
        take: limit,
        order: { prod_price: 'asc'}
    }) 

    // 3. Obtener min y max de precio con filtros aplicados
    const qb = productRepo.createQueryBuilder('product');
    if (category) {
        qb.andWhere('product.prod_category = :category', { category})
    }

    if (min != null) {
        qb.andWhere('product.prod_price >= :min', {min})
    }

    if (max != null){
        qb.andWhere('product.prod_price <= :max', {max})
    }


    const { min: minPrice, max: maxPrice } = await qb
        .select('MIN(product.prod_price)', 'min')
        .addSelect('MAX(product.prod_price)', 'max')
        .getRawOne();

        // totalitems  es prosucts en el antiguo
        return {
            products,
            pagination:{
                totalItems,
                currentPage: page,
                totalPages: Math.ceil(totalItems.length / limit),
                itemsPerPage: limit
            },
            priceRange: {
                min: Number(minPrice),
                max: Number(maxPrice),
            },
        }
};


export { getProducts,insertProduct,getProductById,updateProduct, deleteProduct, getFilterProducts, getProductsByOfert };   